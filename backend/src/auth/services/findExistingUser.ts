import { UserDocument } from "../../user/models/user";

export const findExistingUser = async (username: string, findExistingUserFn: (username: string) => Promise<UserDocument | null>): Promise<void> => {
  const user = await findExistingUserFn(username);
  if (user !== null) throw new Error('USER_ALREADY_EXISTS');
}
