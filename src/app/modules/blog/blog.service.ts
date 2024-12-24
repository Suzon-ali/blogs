import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const creatBlogIntoDB = async (payload: TBlog) => {
  const newBlog = new Blog(payload);
  const result = await newBlog.save();
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find().populate('author');
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true },
  );
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndUpdate({ _id: id }, { isDeleted: true });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found', '');
  }
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById({ _id: id }).populate('author');
  return result;
};

export const BlogServices = {
  creatBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getSingleBlogFromDB,
};
