import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { httpResponse } from "../utils/httpResponse";
import {
  VLogin,
  VResendOtp,
  VSignUp,
  VValidateOtp,
} from "../validator/user.validator";
import { CustomRequest, IGAuth, IGAuthProfile, SignupType } from "../types";
import { doValidate } from "../utils/doValidate";
import { pool } from "..";
import { decrypt, encrypt } from "../services/crypto";
import { ErrorHandler } from "../utils/ErrorHandler";
import { COOKIE_KEY, ONLINE_PAYMENT, ORDER_CONFIRMED, ORDER_DELIVERED, ORDER_PENDING, ORDER_SHIPPED } from "../constant";
import { createToken } from "../services/jwt";
import { sendEmail } from "../utils/sendEmail";
import { doTransition } from "../utils/doTransition";
import { insertOtpToDatabase } from "../services/users.service";
import { createOtp } from "../utils/createOtp";

// normal login system
export const signUp = asyncErrorHandler(async (req, res) => {
  const value = doValidate<SignupType>(VSignUp, req.body ?? {});

  const encodedPassword = encrypt(value.password);

  const OTP = createOtp();

  await doTransition(async (client) => {
    const { rowCount } = await client.query(
      `
        INSERT INTO users (name, email, phone_no, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
      `,
      [value.name, value.email, value.phone_no, encodedPassword]
    );
    if (rowCount == 0)
      throw new ErrorHandler(
        400,
        "Your account already exist with this email addresss"
      );

    //store otp to the db with expire date 5 minit
    await insertOtpToDatabase(value.email, OTP.toString(), client);
  });

  // send otp to the email
  sendEmail(value.email, "SIGNUP_OTP", {
    userName: value.name,
    otpCode: OTP,
    expiryMinutes: "5",
  });

  httpResponse(
    res,
    200,
    `Otp has successfully sent to this email ${value.email}`
  );
});

export const login = asyncErrorHandler(async (req, res) => {
  const value = doValidate<{ email: string; password: string }>(
    VLogin,
    req.body ?? {}
  );

  const { rows, rowCount } = await pool.query(
    "SELECT id, password, name, role, is_verified FROM users WHERE email = $1",
    [value.email]
  );

  if (rowCount == 0) throw new ErrorHandler(404, "Account does not found");

  const { isError, decrypted } = decrypt(rows[0].password);
  if (isError) throw new ErrorHandler(500, "Invalid password stored");

  if (decrypted != value.password)
    throw new ErrorHandler(400, "Wrong user credential");

  const isVerified = rows[0].is_verified;
  const userName = rows[0].name;

  if (!isVerified) {
    const OTP = Math.floor(1000 + Math.random() * 9999);

    //store otp to the db with expire date 5 minit
    await insertOtpToDatabase(value.email, OTP.toString());

    // send otp to the email
    sendEmail(value.email, "SIGNUP_OTP", {
      userName,
      otpCode: OTP,
      expiryMinutes: "5",
    });
    return httpResponse(res, 301, "Check your email for otp");
  }

  const token = createToken(
    {
      id: rows[0].id,
      role: rows[0].role,
    },
    {
      expiresIn: "1d",
    }
  );

  httpResponse(res, 200, "Successfully login", {
    [COOKIE_KEY]: token,
  });
});

export const verifyOtp = asyncErrorHandler(async (req, res) => {
  const value = doValidate<{ otp: string; email: string; password?: string }>(
    VValidateOtp,
    req.body ?? {}
  );

  await doTransition(async (client) => {
    const { rows, rowCount } = await client.query(
      `
      SELECT *
      FROM otps
      WHERE email = $1
        AND otp = $2
        -- AND created_at > (NOW() AT TIME ZONE 'Asia/Kolkata') - INTERVAL '5 minutes';
      `,
      [value.email, value.otp]
    );

    if (rowCount === 0 || rows[0].otp != value.otp)
      throw new ErrorHandler(400, "Invalid otp");

    if (value.password) {
      // if it comes with password than change the password
      const encodedPassword = encrypt(value.password);
      await client.query(
        "UPDATE users SET is_verified = 'true', password = $1 WHERE email = $2",
        [encodedPassword, value.email]
      );
    } else {
      await client.query(
        "UPDATE users SET is_verified = 'true' WHERE email = $1",
        [value.email]
      );
    }
     await client.query("DELETE FROM otps WHERE email = $1 AND otp = $2", [value.email, value.otp])
  });

 

  if (value.password) {
    return httpResponse(res, 200, "Password reset successfully completed!");
  }
  httpResponse(res, 200, "Email verification successfully completed!");
});

export const sendOtp = asyncErrorHandler(async (req, res) => {
  const value = doValidate<{ email: string }>(VResendOtp, req.body ?? {});

  const OTP = createOtp();

  const { rows } = await pool.query("SELECT name FROM users WHERE email = $1", [
    value.email,
  ]);
  if (rows.length == 0)
    throw new ErrorHandler(404, "No account found with this email");

  const userName = rows[0].name;

  // UPDATE otps
  //    SET otp = $1, created_at = NOW()
  //   WHERE email = $2 
  //         AND created_at <= NOW() - INTERVAL '1 minutes'

  // need to add too manu requst security here
  const { rowCount } = await pool.query(
    `
    INSERT INTO otps (email, otp) 
      VALUES ($1, $2)
      ON CONFLICT (email) DO UPDATE
      SET 
        otp = EXCLUDED.otp,
        created_at = NOW();
    `,
    [value.email, OTP]
  );

  if (rowCount === 0)
    throw new ErrorHandler(
      400,
      "Too many resend otp request please try again after some time"
    );

  // send otp to the email
  sendEmail(value.email, "SIGNUP_OTP", {
    userName,
    otpCode: OTP,
    expiryMinutes: "5",
  });

  httpResponse(res, 200, "Otp sent successfull");
});

//login with google
export const loginWithGoogle = asyncErrorHandler(async (req, res) => {
  let state: string | null = null;

  if (req.query.redirect) {
    state = Buffer.from(
      JSON.stringify({ redirectAfterLogin: req.query.redirect })
    ).toString("base64");
  }

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    process.env.CLIENT_ID
  }&redirect_uri=${
    process.env.REDIRECT_URL
  }&response_type=code&scope=profile email${
    state !== null ? `&state=${encodeURIComponent(state)}` : ""
  }`;

  res.status(307).redirect(url);
});

export const verifyGoogleLogin = asyncErrorHandler(async (req, res) => {
  const { code, state } = req.query;

  let redirectAfterLogin = process.env.FRONTEND_HOST_URL;

  if (state) {
    try {
      const decoded = JSON.parse(
        Buffer.from(state.toString(), "base64").toString("utf-8")
      );
      if (decoded.redirectAfterLogin)
        redirectAfterLogin = decoded.redirectAfterLogin;
    } catch (err) {
      console.error("Invalid state param:", err);
    }
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
      redirect_uri: process.env.REDIRECT_URL,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok)
    throw new ErrorHandler(
      400,
      "Some error happened while verifying google login"
    );

  const result = await response.json();
  const { access_token } = result as IGAuth;

  const profileResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  if (!profileResponse.ok)
    throw new ErrorHandler(
      400,
      "Some error happened while fetching user profile info"
    );

  const googleProfile = (await profileResponse.json()) as IGAuthProfile;

  const encryptPassword = encrypt(googleProfile.id);

  const { rows } = await pool.query(
    `
    INSERT INTO users 
      (name, email, phone_no, password, is_verified)
    VALUES 
      ($1, $2, $3, $4, $5)
    ON CONFLICT (email)
    DO UPDATE SET
      name = EXCLUDED.name,
      is_verified = 'true'
    RETURNING id
  `,
    [googleProfile.name, googleProfile.email, "", encryptPassword, true]
  );

  const token = createToken(
    {
      // role: rows[0].user_role,
      name: googleProfile.name,
      id: rows[0].id,
      google_oauth_access_token: access_token,
    },
    { expiresIn: "1d" }
  );

  res.redirect(redirectAfterLogin || "");
});

export const getUserOrdersList = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const userId = req.token_info?.id;
    if (!userId) throw new ErrorHandler(401, "Unauthorize user");

    const { rows } = await pool.query(
      `
     SELECT
      o.order_id,
      o.order_number,
      TO_CHAR(o.created_at, 'DD Mon YYYY') AS order_date,
      o.order_status,
      o.total_amount,
      o.payment_method,
      CASE
        WHEN o.order_status = '${ORDER_DELIVERED}' 
              AND o.payment_method = '${ONLINE_PAYMENT}' 
              AND o.updated_at >= NOW() - INTERVAL '7 days'
        THEN true
        ELSE false
      END AS is_returnable,
      CASE
        WHEN o.order_status = '${ORDER_DELIVERED}' 
              AND o.updated_at >= NOW() - INTERVAL '7 days'
        THEN true
        ELSE false
      END AS is_replaceable,
      CASE
       WHEN o.order_status = '${ORDER_DELIVERED}'
       THEN true
       ELSE false
      END AS invoice_avilable,
      o.waybill AS tracking_id,
      CASE
        WHEN o.order_status = '${ORDER_PENDING}' OR o.order_status = '${ORDER_CONFIRMED}' OR o.order_status = '${ORDER_SHIPPED}'
        THEN true
        ELSE false
      END AS is_cancelable,
      JSON_AGG(
        CASE
          WHEN oi.variant_info IS NOT NULL
          THEN JSON_BUILD_OBJECT(
          'product_name', oi.variant_info->>'product_name',
          'quantity', oi.quantity,
          'sku', oi.variant_info->>'sku',
          'price', oi.variant_info->'price',
          'images', COALESCE(
              oi.variant_info->'images'->0,
              (
                SELECT 
                  jsonb_build_object(
                    'image',   image,
                    'alt_tag', alt_tag 
                  )    
                FROM product_images 

                WHERE product_id = (oi.variant_info->>'product_id')::int
                LIMIT 1
              )
            )
          )
          ELSE JSON_BUILD_OBJECT(
          'product_name', oi.product_info->>'name',
          'quantity', oi.quantity,
          'sku', null,
          'images', oi.product_info->'images'->0,
          'price', oi.product_info->'price'
          )
        END
      ) AS ordered_products
      FROM orders o

      LEFT JOIN order_items oi
      ON oi.order_id = o.order_id

      WHERE o.user_id = $1

      GROUP BY o.order_id

      ORDER BY o.order_id DESC
    `,
      [userId]
    );

    httpResponse(res, 200, "User order list", rows);
  }
);
