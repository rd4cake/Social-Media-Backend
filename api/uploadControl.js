import dotenv from "dotenv";
import mongo from "mongodb";
import mongodb from "mongodb";
import Grid from "gridfs-stream";

let gfs;
let gridfsBucket;

export default class uploadDAO {
  static async injectDB(conn) {
    if (gfs) {
      return;
    }

    try {
        gridfsBucket = new mongodb.GridFSBucket(conn.db("KIU"), {
            bucketName: 'photos'
          })

        gfs = Grid(conn.db("KIU"), mongo);
        gfs.collection("photos");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in uploadDAO: ${e}`
      );
    }
  }

  static async addupload(req, res) {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `https://blooming-badlands-08592.herokuapp.com/file/${req.file.filename}`;
    return res.send(imgUrl);
  }

  static async getUpload(req, res) {
    try {
      const readStream = gridfsBucket.openDownloadStreamByName(req.params.filename);
      readStream.pipe(res);
    } catch (error) {
        console.log(error)
      res.send("not found");
    }
  }
}

// require("dotenv").config();
// const upload = require("./routes/upload");
// const Grid = require("gridfs-stream");
// const mongoose = require("mongoose");
// const connection = require("./db");
// const express = require("express");
// const app = express();

// let gfs;
// connection();

// const conn = mongoose.connection;
// conn.once("open", function () {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("photos");
// });

// app.use("/file", upload);

// // media routes
// app.get("/file/:filename", async (req, res) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename });
//         const readStream = gfs.createReadStream(file.filename);
//         readStream.pipe(res);
//     } catch (error) {
//         res.send("not found");
//     }
// });

// app.delete("/file/:filename", async (req, res) => {
//     try {
//         await gfs.files.deleteOne({ filename: req.params.filename });
//         res.send("success");
//     } catch (error) {
//         console.log(error);
//         res.send("An error occured.");
//     }
// });

// const port = process.env.PORT || 8080;
// app.listen(port, console.log(`Listening on port ${port}...`));
