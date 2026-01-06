import { input } from "../../ui/input";
import "./login-register.css";

const inputsLabel = [
  { placeholder: "jhondoe", id: "username", label: "Username", type: "text" },
  { placeholder: "password", id: "password", label: "Password", type: "password" },
];

export const loginForm = () => {
  return `
    <div class="auth-box register-variant">
      <header>
        <h3>Sign In</h3>
        <p>Enter your username below to login to your account</p>
      </header>
      <form id="auth-form">
        <div class="form-fields">
          ${inputsLabel
            .map(
              (el) => `
            <div class="field-group">
              <label for="${el.id}">${el.label}</label>
              ${input(true, el.placeholder, el.id, el.type)}
            </div>
          `,
            )
            .join("")}
        </div>
        <div>
          <a href="/xd" class="forget-btn">Forget your password?</a>
        </div>
        <div id="form-error" class="error-msg" style="display: none;"></div>
        <button type="submit" class="btn-primary">Login</button>
      </form>
    </div>
  `;
};
