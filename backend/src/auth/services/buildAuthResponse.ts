import type { UserDocument } from "../../user/models/user"

export const buildAuthResponde = (user: UserDocument, tokenGen: (payload: object) => string) => {
  const token = tokenGen({ userId: user._id, role: user.role })

  return {
    token,
    user: {
      userId: user._id.toString(),
      username: user.username,
      role: user.role
    }
  }
}
