type ValidationSign = {
  valid: boolean;
  error?: string;
};

const validateEmail = (email: string): ValidationSign => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return { valid: emailRegex.test(email) };
};

const validatePassword = (password: string): ValidationSign => {
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

const validateUsername = (username: string): ValidationSign => {
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

export const validationSignUp = (
  username: string,
  email: string,
  password: string,
): ValidationSign => {
  return validateUsername(username) && validateEmail(email) && validatePassword(password);
};
