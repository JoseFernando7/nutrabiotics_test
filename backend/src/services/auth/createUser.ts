import { UserDocument, User } from "../../models/user";
import { CreateUserDTO } from "../../dtos/user/createUserDto";

export const createUser = async (createUserDTO: CreateUserDTO, hashedPassword: string): Promise<UserDocument> => {
  const newUser: UserDocument = new User({
    username: createUserDTO.username,
    password: hashedPassword,
    role: createUserDTO.role
  });

  return newUser;
}
