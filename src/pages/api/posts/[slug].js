import dbConnect from "./../../../utils/dbConnect";
import Post from "./../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { slug } = req.query;
  const post = await Post.findOne({ slug });

  if (!post) {
    return res.status(404).json({ message: "Data not found" });
  }

  return res.status(200).json(post);
}
