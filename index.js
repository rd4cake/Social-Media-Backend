import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import postDAO from "./DAO/postDAO.js"
import uploadDAO from "./DAO/uploadDAO.js"
import upload from "./api/uploadControl.js"

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.URI, {
  maxPoolSize: 50,
  wtimeoutMS: 3000,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await postDAO.injectDB(client);
    await uploadDAO.injectDB(client);
    await upload.injectDB(client)
    app.listen(port, () => console.log(`listening on port ${port}`));
  });