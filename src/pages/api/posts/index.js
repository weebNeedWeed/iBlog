import dbConnect from "./../../../utils/dbConnect";
import Post from "./../../../models/Post";
import User from "./../../../models/User";
import KhongDau from "khong-dau";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    const { page, rowsPerPage } = req.query;
    if (!page || !rowsPerPage) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(rowsPerPage))
      .skip(parseInt(rowsPerPage) * page);

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts" });
    }

    return res.status(200).json(posts);
  } else if (req.method === "POST") {
    await dbConnect();
    const { title, content, authKey } = req.body;

    if (!title || !content || !authKey) {
      return res.status(400).json({ message: "Missing parameters" });
    }
    const splitIndex = authKey.search("_");
    const userId = authKey.slice(0, 24);
    const password = authKey.slice(24, splitIndex);
    const username = authKey.slice(splitIndex + 1);

    const user = await User.findOne({ _id: userId, username, password });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const description = req.body.description || "";
    const slug =
      req.body.slug || KhongDau(title).toLowerCase().trim().replace(/ /g, "-");
    const newPost = new Post({
      title,
      content,
      description,
      slug,
    });
    await newPost.save();

    return res.status(200).json({ message: "Success" });
  } else {
    res.status(404).json({ message: "Error" });
  }
}
