import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dance-test", "routes/dance-test.tsx"),
] satisfies RouteConfig;
