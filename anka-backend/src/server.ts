import { app } from "./shared/infra/app/app.ts";
import "./shared/infra/http/routes.ts";
import "./shared/infra/lib/cache/index.ts";

app.listen({ host: "0.0.0.0", port: 3001 }).then(() => {
  console.log("[ANKA] HTTP Server running!");
});
