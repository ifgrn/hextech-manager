import { input } from "../../ui/input";
import "./login-register.css";

const inputsLabel = [
  { placeholder: "jhondoe", id: "username", label: "Username", type: "text" },
  { placeholder: "user@email.com", id: "email", label: "Email", type: "email" },
  { placeholder: "Password", id: "password", label: "Password", type: "password" },
  {
    placeholder: "Confirm Password",
    id: "confirm-password",
    label: "Confirm Password",
    type: "password",
  },
];

export const registerForm = () => {
  return `
    <div class="auth-box register-variant">
      <header>
        <h3>Sign Up</h3>
        <p>Enter your information to create an account</p>
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
        <div id="form-error" class="error-msg" style="display: none;"></div>
        <button type="submit" class="btn-primary">Create an Account</button>
      </form>
    </div>
  `;
};
