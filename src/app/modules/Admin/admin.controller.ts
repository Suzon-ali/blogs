import catchAsync from '../../utils/catchAsync';
import { Response, Request } from 'express';
import { AdminServices } from './admin.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId;

  console.log('Request Cookies:', req.cookies); // Debugging
  console.log('Request Headers:', req.headers); // Debugging

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid userId!', '');
  }
  // Check if the user is exist
  if (!(await User.isUserExistsById(id))) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', '');
  }
  const result = await AdminServices.blockUserFromDB(id);

  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User blocked successfully!',
      data: null,
    });
  }
});

const deleteBlogByAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid userId!', '');
  }
  // Check if the user is exist
  if (!(await Blog.isBlogExistById(id))) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', '');
  }

  const result = await AdminServices.deleteBlogByAdminFromDB(id);

  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Blog deleted successfully!',
      data: null,
    });
  }
});

export const AdminControllers = {
  blockUser,
  deleteBlogByAdmin,
};
