import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.loginUserIntoDB(user);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'development',
    httpOnly: false,
  });

  sendResponse(res, {
    success: true,
    message: 'User logged in succesfully!',
    statusCode: StatusCodes.OK,
    data: { accessToken, refreshToken },
  });
});

export const AuthContollers = {
  loginUser,
};
