import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const creatBlogIntoDB = async (payload: TBlog) => {
  const newBlog = new Blog(payload);
  const result = newBlog.save();
  return result;
};

export const BlogServices = {
  creatBlogIntoDB,
};
