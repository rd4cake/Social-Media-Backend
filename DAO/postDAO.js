import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let post;

export default class postDAO {
  static async injectDB(conn) {
    if (post) {
      return;
    }
    try {
      post = await conn.db("KIU").collection("Post");
    } catch (e) {
      console.error(
      `Unable to establish a collection handle in postDAO: ${e}`
      );
    }
  }

  static async getpost({
    filters = null,
    page = 0,
    postPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { "name": { $eq: filters["name"] } };
      } else if ("date" in filters) {
        query = { "date": { $eq: filters["date"] } };
      } else if ("img" in filters) {
        query = { "img": { $eq: filters["img"] } };
      } else if ("content" in filters) {
        query = { $text: { $search: filters["content"] } };
      }
    }

    let cursor;
    try {
      cursor = await post.find(query);
    } catch (e) {
      console.error(`${e} bruh`);
      return { postList: [], totalNumpost: 0 };
    }

    const displayCursor = cursor
      .limit(postPerPage)
      .skip(postPerPage * page);

    try {
      const postList = await displayCursor.toArray();
      const totalNumpost = await post.countDocuments(query);
      return { postList, totalNumpost };
    } catch (e) {
      console.error(`${e}`);
      return { postList: [], totalNumpost: 0 };
    }
  }

  static async addpost(nameA, imgA, contentA, dateA) {
    try {
      const reviewDoc = {
        name: nameA,
        img: imgA,
        content: contentA,
        date: dateA,
      };
      return await post.insertOne(reviewDoc);
    } catch (e) {
      console.error(`add post : ${e}`);
      return { error: e };
    }
  }
  // static async updatepost(fromA, id, textA, setDateA) {
  //   try {
  //     const updateResponse = await post.updateOne(
  //       { from: fromA, _id: ObjectId(id) },
  //       { $set: { text: textA, setDate: setDateA } }
  //     );

  //     return updateResponse;
  //   } catch (e) {
  //     console.error(`update: ${e}`);
  //     return { error: e };
  //   }
  // }
  static async removepost(id) {
    try {
      const deleteSchdules = await post.deleteOne({
        _id: ObjectId(id)
      });
      return deleteSchdules;
    } catch (e) {
      console.error(`delete: ${e}`);
      return { error: e };
    }
  }
}
