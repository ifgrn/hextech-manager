import { login_page } from "./pages/login-page/login-page";
import { handleLogin } from "./services/auth";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

const initApp = () => {
  if (app) {
    // Inyectamos el contenido
    app.innerHTML = login_page();

    // Vinculamos los eventos DESPUÉS de inyectar
    handleLogin();
  }
};

// Ejecutamos la inicialización
initApp();
