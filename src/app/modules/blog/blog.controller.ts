/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BlogServices } from './blog.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const blog = {
    ...req.body,
    author: loggedInUser?.author,
  };
  const result = await BlogServices.creatBlogIntoDB(blog);
  const populatedResult = await result.populate('author');
  res.status(StatusCodes.CREATED).json({
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created succesfully!',
    data: populatedResult,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog fetched succesfully!',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
};
