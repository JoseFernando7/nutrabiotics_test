import bcrypt from "bcryptjs";

import { UserDocument, User } from "../../user/models/user";
import { CreateUserDTO } from "../../user/dtos/createUserDto";

export type RegisterDeps = {
  findExistingUser: (username: string) => Promise<UserDocument | null>;
  hashPassword: (password: string) => Promise<string>;
  createUser: (userData: CreateUserDTO & { password: string }) => Promise<UserDocument>;
}

export const registerDeps: RegisterDeps = {
  findExistingUser: async (username: string): Promise<UserDocument | null> => User.findOne({ username }),
  hashPassword: async (password: string): Promise<string> => bcrypt.hash(password, 10),
  createUser: async (userData: CreateUserDTO & { password: string }): Promise<UserDocument> => {
    const newUser = new User({
      username: userData.username,
      password: userData.password,
      role: userData.role,
    });

    return newUser.save();
  }
}
