import { RequestHandler } from "express";
import prisma from "../../database/prisma";

import {
  checkPasswordMatch,
  CreateSessionToken,
  CreateUser,
  FindUserByEmail,
} from "../../services/user/index";

const updateLimit: RequestHandler = async (req, res) => {
  try {
    const { limit } = req.body as { limit: number };

    await prisma.user.update({
      where: { id: req.user.id },
      data: { limit: limit },
    });

    res.status(201).send({
      message: "Limit set",
    });
  } catch (error) {
    res.status(400).send({
      message: "Limits was not successfully created",
    });
  }
};

// const updateNumbers: RequestHandler = async (req, res) => {
//   try {
//     const { numbers } = req.query as unknown as { numbers: number[] };
//     console.log('few');
//     console.log(numbers);

//     await prisma.user.update({ where: { id: req.user.id }, data: { numbers } });

//     res.status(200).send({
//       message: 'Numbers updated',
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       message: 'Numbers was not successfully updated',
//     });
//   }
// };

const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, name, password, number } = req.body;

    if (!email || !password || !name) {
      throw new Error("Not all data provided");
    }

    const user = await CreateUser({ email, name, password, number });

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
      error: true,
    });
  }
};

const GetUser: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("No user was found");
    }

    res.status(200).send({
      user: req.user,
    });
  } catch (error) {
    res.status(404).send({
      message: "User was not found",
    });
  }
};

const LoginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields must be provided");
    }

    const user = await FindUserByEmail(email);

    if (!user) {
      throw new Error("Email or password is not correct");
    }

    if (!(await checkPasswordMatch(password, user.password))) {
      throw new Error("Email or password is not correct");
    }

    const token = await CreateSessionToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).send({
      message: "User is logged in",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const logout: RequestHandler = (_, res) => {
  try {
    res.clearCookie("token").send();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export { LoginUser, GetUser, logout, registerUser, updateLimit };
