import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import config from '../../config';
import createToken from './auth.utils';

const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  //check if it's a valid  user
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found', '');
  }
  //check if it's not blocked user
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked', '');
  }

  //check if password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Wrong password', '');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    author: user?._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUserIntoDB,
};
