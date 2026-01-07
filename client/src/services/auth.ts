const url = import.meta.env.VITE_API_URL;
// auth.ts
const login = async (username: string, password: string) => {
  const response = await fetch(`${url}api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const handleLogin = () => {
  const login_form = document.querySelector("#auth-form") as HTMLFormElement; // ← Cambiado a register-form

  if (!login_form) {
    console.error("Form not found");
    return;
  }

  login_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(login_form);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const userData = await login(username, password);
      console.log("Login exitoso:", userData);
      // Aquí puedes redirigir o guardar el token
    } catch (err) {
      const error = err as Error;
      console.error("Error:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  });
};
