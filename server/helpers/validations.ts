export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string,
): { valid: boolean; error?: string } => {
  if (password.length < 8) {
    return {
      valid: false,
      error: "La contraseña debe tener al menos 8 caracteres",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: "La contraseña debe tener al menos una mayúscula",
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      error: "La contraseña debe tener al menos una minúscula",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      error: "La contraseña debe tener al menos un número",
    };
  }
  return { valid: true };
};

export const validateUsername = (
  username: string,
): { valid: boolean; error?: string } => {
  if (username.length < 3) {
    return {
      valid: false,
      error: "El usuario debe tener al menos 3 caracteres",
    };
  }
  if (username.length > 30) {
    return { valid: false, error: "El usuario no puede exceder 30 caracteres" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      valid: false,
      error: "El usuario solo puede contener letras, números y guiones bajos",
    };
  }
  return { valid: true };
};
