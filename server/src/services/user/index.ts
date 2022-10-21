import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { User } from '.prisma/client';
import prisma from '../../database/prisma';

const jwtKey = '#$#034283!4$£@123mDfe_&_@$_&??+';
const key = new TextEncoder().encode(jwtKey);

const FindUserByID = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

const FindUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
};

const CreateUser = async (user: Prisma.UserCreateInput): Promise<User> => {
  const userExist = await FindUserByEmail(user.email);

  if (userExist) {
    throw new Error('User already exists');
  }

  const password = await bcrypt.hash(user.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      email: user.email.toLowerCase(),
      name: user.email,
      password,
    },
  });

  createdUser.password = '';

  return createdUser;
};

const CreateSessionToken = async (userId: string): Promise<string> => {
  const token = await new jose.SignJWT({ aud: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);

  return token;
};

const VerifySessionToken = async (token: string): Promise<jose.JWTVerifyResult> => {
  return await jose.jwtVerify(token, key);
};

const GetUserFromToken = async (token: string) => {
  const decoded = await VerifySessionToken(token);

  if (!decoded) {
    throw new Error();
  }
  const userId = decoded.payload.aud as string;

  const user = await FindUserByID(userId);

  if (!user) {
    throw new Error('User was not found');
  }
  return user;
};

const checkPasswordMatch = async (password: string, hashPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

// const getCompanySubscriptionStatus =  async(user: User) => {

// }

export {
  FindUserByID,
  CreateUser,
  CreateSessionToken,
  GetUserFromToken,
  VerifySessionToken,
  FindUserByEmail,
  checkPasswordMatch,
};
