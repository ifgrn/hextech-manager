import "./style.css";
import { home_view } from "./views/home_view";

const $ = (element: string) => document.querySelector(element);
const $app = $("#app");

$app.innerHTML = home_view();
