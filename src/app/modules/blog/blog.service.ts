import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const creatBlogIntoDB = async (payload: TBlog) => {
  const newBlog = new Blog(payload);
  const result = newBlog.save();
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};

export const BlogServices = {
  creatBlogIntoDB,
  getAllBlogsFromDB,
};
