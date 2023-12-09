import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compareSync(password, hashedPassword);
};
