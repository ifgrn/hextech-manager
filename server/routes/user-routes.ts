import { Hono } from "hono";
import { getAllUsers, getCurrentUser, login, logout, signup } from "../controllers/user-controller";
import { middleware_auth } from "../middleware/middleware";

const users = new Hono();

users.post("/register", signup);
users.post("/login", login);
users.get("/current", middleware_auth, getCurrentUser);
users.post("/logout", logout);

export default users;
