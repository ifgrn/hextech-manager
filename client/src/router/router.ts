import { dashboard_view } from "../views/dashboard-view";
import { home_view } from "../views/home-view";
import { login_view } from "../views/login-view";
import { notFound_view } from "../views/not-found"; // Add this

const routes: Record<string, () => string> = {
  "/": home_view,
  "/dashboard": dashboard_view,
  "/login": login_view,
  // Add more routes as needed
};

const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

const router = () => {
  const path = window.location.pathname;
  const viewFunction = routes[path];

  // Update active link in navigation
  updateActiveLink(path);

  // Render the view
  const app = document.getElementById("app");
  if (app) {
    try {
      app.innerHTML = viewFunction ? viewFunction() : notFound_view();
    } catch (error) {
      console.error("Error rendering view:", error);
      app.innerHTML = '<div class="error">Error loading page</div>';
    }
  }
};

const updateActiveLink = (currentPath: string) => {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const anchor = link as HTMLAnchorElement;
    const linkPath = new URL(anchor.href).pathname;

    if (linkPath === currentPath) {
      anchor.setAttribute("aria-current", "page");
      anchor.classList.add("active");
    } else {
      anchor.removeAttribute("aria-current");
      anchor.classList.remove("active");
    }
  });
};

// Initialize router
export const initRouter = () => {
  // Handle link clicks
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest("[data-link]") as HTMLAnchorElement;

    if (link) {
      e.preventDefault();
      navigateTo(link.href);
    }
  });

  // Handle browser navigation
  window.addEventListener("popstate", router);

  // Initial route
  document.addEventListener("DOMContentLoaded", router);
};
