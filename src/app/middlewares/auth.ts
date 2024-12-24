/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredUserRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    //check if token exists in header
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', '');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email } = decoded;

    const user = await User.isUserExistsByEmail(email);

    //check if the user exists
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!', '');
    }

    const isBlocked = user.isBlocked;

    //check if the user exists
    if (isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is not found!', '');
    }

    const role = user?.role;

    //check if loggedInUser-role matches with required role
    if (requiredUserRole && !requiredUserRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', '');
    }

    (req as any).user = decoded as JwtPayload;
    next();
  });
};

export default auth;
