import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"), // New beautiful landing page for the couple
  route("/system", "routes/system.tsx"), // System admin page (old home functionality)
  route("/init", "routes/init.tsx"),
  route("/scanner", "routes/scanner.tsx"),
  route("/admin", "routes/admin.tsx"),
] satisfies RouteConfig;
