import { Hono } from "hono";
import {
  addAccount,
  deleteAccountByID,
  getAllActiveAcounts,
  updateAccountByID,
} from "../controllers/account-controller";

const accounts = new Hono();

accounts.post("/add", addAccount);
accounts.get("/", getAllActiveAcounts);
accounts.delete("/delete/:id", deleteAccountByID);
accounts.put("/update/:id", updateAccountByID);

export default accounts;
