import dbConnect from "./../../../utils/dbConnect";
import Post from "./../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { page, rowsPerPage } = req.query;
  if (!page || !rowsPerPage) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(parseInt(rowsPerPage))
    .skip(parseInt(rowsPerPage) * page);

  if (posts.length === 0) {
    return res.status(404).json({ error: "No posts" });
  }

  return res.status(200).json(posts);
}
