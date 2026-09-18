import cookieParser from "cookie-parser";
import express from "express";
import { userRoute } from "./routes/user.routes";
import { globalErrorController } from "./controllers/error.controller";
import { Pool } from "pg";
import { configDb } from "./config/db";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import { mediaItem } from "./routes/media.routes";
import { productRoute } from "./routes/product.routes";
import { discountRoute } from "./routes/discount.routes";
import { orderRoutes } from "./routes/orders.routes";
import { paymentRoute } from "./routes/payment.routes";
import { webHookRoutes } from "./routes/webhook.routes";
import asyncErrorHandler from "./middleware/asyncErrorHandler";
import { ErrorHandler } from "./utils/ErrorHandler";
import { encrypt } from "./services/crypto";
import { websiteRoute } from "./routes/website.routes";

// Load environment variables based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.local" : ".env",
});

const app = express();

const API_PREFIX = "/api/v1";

// FIX 1: Explicitly handle dynamic origins with credentials support
const allowedOrigins = [
  "http://localhost:3000", // Your local Next.js instance
  // Add your frontend ngrok URL here without a trailing slash, e.g.:
  // 'https://ngrok-free.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server requests or tools like Postman (which don't send an origin header)
      console.log(origin);
      if (!origin) return callback(null, true);

      // Dynamically match regular localhost or any ngrok tunnel URL
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".ngrok-free.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // MANDATORY: Allows cookies and authorization headers to pass through
  }),
);

export const pool = new Pool(configDb());

app.use(
  `${API_PREFIX}/webhook`,
  (_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  },
  webHookRoutes,
);

app.use(express.static(path.resolve(path.join(process.cwd(), "public"))));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve(path.join(process.cwd(), "views")));

app.use(`${API_PREFIX}/users`, userRoute);
app.use(`${API_PREFIX}/products`, productRoute);
app.use(`${API_PREFIX}/media-item`, mediaItem);
app.use(`${API_PREFIX}/discount`, discountRoute);
app.use(`${API_PREFIX}/orders`, orderRoutes);
app.use(`${API_PREFIX}/payments`, paymentRoute);
app.use(`${API_PREFIX}/website`, websiteRoute);

app.get("/", (_, res) => {
  res.send("Api Server is running!");
});

app.get("/create-pass", (req, res) => {
  res.send(encrypt(req.query.pass?.toString() ?? ""));
});

app.get(
  "/init-db",
  asyncErrorHandler(async (req, res) => {
    if (!req.query.pass || req.query.pass !== process.env.INIT_SQL_PASSWORD)
      throw new ErrorHandler(403, "Forbidden");

    const SQL_PATH = path.resolve(__dirname, "./config/database.sql");
    const sql = fs.readFileSync(SQL_PATH, "utf-8");

    (async function () {
      await pool.query(sql);
    })();

    res.send("Database initialized successfully");
  }),
);

app.use(globalErrorController);

const HOST = process.env.HOST || "localhost";
const PORT = parseInt(process.env.PORT || "8080");
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
