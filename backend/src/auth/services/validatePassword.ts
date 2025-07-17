export const validatePassword = async (input: string, hash: string, compareFn: (input: string, hash: string) => Promise<boolean>): Promise<void> => {
  const isValid = await compareFn(input, hash)
  if (!isValid ) {
    throw new Error('INVALID_PASSWORD')
  }
}
