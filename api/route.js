import express from "express";
import postController from "./postControl.js";
import uploadController from "./imgUploadControl.js";
import uploadControl from "./uploadControl.js";
import test from "./test.js"

const router = express.Router();

router
  .route("/")
  .get(postController.apiGetpost)
  .post(postController.apiPostpost)
  .delete(postController.apiDeletepost);

router
  .route("/file/upload")
  .get((req, res) => res.send("HELLO"))
  .post(uploadController.postUpload);

export default router;
