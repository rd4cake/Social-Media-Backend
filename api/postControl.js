import postDAO from "../DAO/postDAO.js"

export default class postController {
  static async apiGetpost(req, res, next) {
    const postsPerPage = req.query.postsPerPage
      ? parseInt(req.query.postsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.img) {
      filters.img = req.query.img;
    } else if (req.query.content) {
      filters.content = req.query.content;
    } else if (req.query.date) {
        filters.date = req.query.date;
    }

    const { postList, totalNumpost } = await postDAO.getpost(
      {
        filters,
        page,
        postsPerPage,
      }
    );

    let response = {
      posts: postList,
      page: page,
      filters: filters,
      entries_per_page: postsPerPage,
      total_results: totalNumpost,
    };
    res.json(response);
  }

  static async apiPostpost(req, res, next) {
    try {
      const name = req.body.name;
      const img = req.body.img;
      const content = req.body.content;
      const date = req.body.date;

      const respose = await postDAO.addpost(
        name,
        img,
        content,
        date
      );
      res.json({ status: "success" });
    } catch (e) {
      console.error(`post: ${e}`);
    }
  }

//   static async apiUpdatepost(req, res, next) {
//     try {
//       const id = req.body.id;
//       const from = req.body.from;
//       const text = req.body.text;
//       const date = new Date(2000, 0, 1);

//       const response = await postDAO.updatepost(from, id, text, date);

//       var { error } = response;
//       if (error) {
//         res.status(400).json({ error });
//       }

//       if (response.modifiedCount === 0) {
//         throw new Error(
//           "unable to update review - user may not be original poster"
//         );
//       }

//       res.json({ status: "success" });
//     } catch (e) {
//       console.error(`${e}`);
//     }
//   }

  static async apiDeletepost(req, res, next) {
      try{
          const id =req.body.id;
          const response = await postDAO.removepost(id)
          res.json({status: "sucess"})
        }
      catch (e) {
          console.error(`${e}`)
      }
  }
}