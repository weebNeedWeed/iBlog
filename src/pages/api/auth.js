import dbConnect from "../../utils/dbConnect";
import User from "./../../models/User";
import md5 from "md5";

export default async function handler(req, res) {
  await dbConnect();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const user = await User.findOne({ username, password: md5(password) });
  if (!user) {
    return res.status(404).json({ error: "Data not found" });
  }

  return res.status(200).json({ message: "success" });
}
