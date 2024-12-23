import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUserIntoDB(user);

  sendResponse(res, {
    success: true,
    message: 'User created succesfully!',
    statusCode: StatusCodes.CREATED,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

export const UserControllers = {
  createUser,
};
