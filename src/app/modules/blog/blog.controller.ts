import { Request, Response } from 'express';
import { BlogServices } from './blog.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = req.body;
  const result = await BlogServices.creatBlogIntoDB(blog);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created succesfully!',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
};
