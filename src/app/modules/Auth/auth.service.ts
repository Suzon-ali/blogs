import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  //check if it's a valid  user
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found', '');
  }
  //check if it's not blocked user
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Blocked', '');
  }

  //check if password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not matched', '');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    author: user?._id,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30D',
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserIntoDB,
};
