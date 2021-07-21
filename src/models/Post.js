import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  description: {
    type: String,
    maxLength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
