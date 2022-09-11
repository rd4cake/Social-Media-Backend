let upload;

export default class uploadDAO {
  static async injectDB(conn) {
    if (upload) {
      return;
    }
    try {
      upload = await conn.db("KIU").collection("uploadImages");
    } catch (e) {
      console.error(
      `Unable to establish a collection handle in uploadDAO: ${e}`
      );
    }
  }

  static async addupload(nameA, imgA) {
    try {
      const reviewDoc = {
        name: nameA,
        img: imgA,
      };
      return await upload.insertOne(reviewDoc);
    } catch (e) {
      console.error(`add upload : ${e}`);
      return { error: e };
    }
  }
}
