import { Router } from "express";
import {
  addNewProduct,
  addNewRecipient,
  createNewCategory,
  createNewReview,
  createNewSubCategory,
  deleteProduct,
  deleteRecipient,
  deleteReview,
  deleteSingleCategory,
  deleteSingleSubCategory,
  getCategoryList,
  getProductList,
  getRecipientList,
  getReviewList,
  getSingleCategory,
  getSingleProductWithId,
  getSingleRecipientList,
  getSingleSubCategory,
  getSubCategoryList,
  // getSingleProduct,
  updateCateogry,
  updateProduct,
  updateRecipient,
  updateReviewStatus,
  updateSubCateogry,
} from "../controllers/product.controller";
import { isAuthorized } from "../middleware/isAuthorized";
import { checkUser } from "../middleware/checkUser";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const productRoute = Router();

productRoute
  .get("/", checkUser, getProductList)
  .post("/", isAuthorized, addNewProduct)
  .put("/", isAuthorized, updateProduct)
  .delete("/:id", isAuthorized, deleteProduct)

  .post("/recipient", isAuthorized, addNewRecipient)
  .put("/recipient", isAuthorized, updateRecipient)
  .get("/recipient", checkUser, getRecipientList)
  .get("/recipient/:id", checkUser, getSingleRecipientList)
  .delete("/recipient/:id", isAuthorized, deleteRecipient)


  .post("/category", isAuthorized, createNewCategory)
  .get("/category", getCategoryList)
  .put("/category", isAuthorized, updateCateogry)
  .get("/category/:id", getSingleCategory)
  .delete("/category/:id", isAuthorized, deleteSingleCategory)
  
  .post("/sub-category", isAuthorized, createNewSubCategory)
  .get("/sub-category", getSubCategoryList)
  .put("/sub-category", isAuthorized, updateSubCateogry)
  .get("/sub-category/:id", getSingleSubCategory)
  .delete("/sub-category/:id", isAuthorized, deleteSingleSubCategory)

  .post("/reviews", isAuthenticated, createNewReview)
  .get("/reviews", checkUser, getReviewList)
  .patch("/reviews/:id", isAuthorized, updateReviewStatus)
  .delete("/reviews/:id", isAuthorized, deleteReview)

  .get("/:product", checkUser, getSingleProductWithId)
