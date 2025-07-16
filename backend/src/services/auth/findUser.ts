import type { UserDocument } from "../../models/user"

export const findUser = async (username: string, findUserFn: (username: string) => Promise<UserDocument | null>): Promise<UserDocument> => {
  const user = await findUserFn(username)
  if (user === null) throw new Error('USER_NOT_FOUND')

  return user
}
