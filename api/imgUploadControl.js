import multer from "multer";
import uploadDAO from "../DAO/uploadDAO.js";

export default class uploadController {

  static async postUpload(req, res, next) {
    let Storage = multer.diskStorage({
      destination: "uploads",
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    let uploadDefault = multer({ storage: Storage }).single("test");

    uploadDefault(req, res, async (err) => {
      if (err) {
        console.log(err);
      } else {
        const name = req.body.name;
        const img = req.file.filename;
        const respose = await uploadDAO.addupload(name, {img, contentype});
        res.json({ status: "success" });
      }
    });
  }
}
