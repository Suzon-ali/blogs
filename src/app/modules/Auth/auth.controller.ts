import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const loginUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.loginUserIntoDB(user);

  sendResponse(res, {
    success: true,
    message: 'User logged in succesfully!',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AuthContollers = {
  loginUser,
};
