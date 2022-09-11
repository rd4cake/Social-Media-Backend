import express, { application } from "express";
import cors from "cors";
import posts from "./api/route.js"
import uploadControl from "./api/uploadControl.js"
import test from "./api/test.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/post", posts)

app.post("/file/upload", test.single("file"), uploadControl.addupload);
app.get("/file/:filename", uploadControl.getUpload)

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;