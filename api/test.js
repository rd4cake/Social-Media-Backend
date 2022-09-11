import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"

const storage = new GridFsStorage({
    url: "mongodb+srv://rd4cake:cheese9090@cluster0.b3wvg.mongodb.net/KIU?retryWrites=true&w=majority",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}${file.originalname}`,
        };
    },
});

export default multer({ storage });