export const hashPassword = async (password: string, hashFn: (password: string) => Promise<string>): Promise<string> => {
  return await hashFn(password);
}