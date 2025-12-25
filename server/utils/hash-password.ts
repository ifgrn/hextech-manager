export const hash_password = async (password: string) => {
  const password_hashed = await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 4 * 1024,
    timeCost: 2,
  });

  return password_hashed;
};

export const verify_password = async (
  password: string,
  hashedPass: string,
): Promise<boolean> => {
  return Bun.password.verify(password, hashedPass);
};
