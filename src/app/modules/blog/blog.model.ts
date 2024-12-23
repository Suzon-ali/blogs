import { model, Schema, Types } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Types.ObjectId },
    isPublished: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<TBlog>('Blog', blogSchema);
