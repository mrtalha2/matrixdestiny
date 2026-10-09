import { PGlite } from "@electric-sql/pglite";
import { createServer, LogLevel } from "pglite-server";

const dataDir = process.env.PG_DATA_DIR || "./.pgdata";
const db = new PGlite(dataDir);
const server = createServer(db, { logLevel: LogLevel.Debug });

const PORT = parseInt(process.env.PG_PORT || "5432", 10);
const HOST = process.env.PG_HOST || "127.0.0.1";

server.listen(PORT, HOST, () => {
  console.log(`🚀 PostgreSQL dev server running at postgresql://postgres:postgres@${HOST}:${PORT}/postgres`);
});

process.on("SIGINT", () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
