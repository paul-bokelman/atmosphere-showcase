import type { AddParameters, ServerRoute } from "~/types";

type ExecuteMiddleware = AddParameters<ServerRoute, [middleware: ServerRoute<any, any>[], index?: number]>;
type Handler = <P, R>(
  ...middleware: ServerRoute<P, R>[]
) => (...handler: Parameters<ServerRoute<P, R>>) => Promise<void>;

const execMiddleware: ExecuteMiddleware = async (req, res, next, middleware, index = 0) => {
  if (res.headersSent || !middleware[index]) return;

  if (typeof middleware[index] !== "function") {
    res.status(500).end("Middleware must be a function!");
    throw new Error("Middleware must be a function!");
  }

  await middleware[index](req, res, async () => {
    await execMiddleware(req, res, next, middleware, index + 1);
  });
};

export const handler: Handler =
  (...middleware) =>
  async (req, res, next) => {
    await execMiddleware(req, res, next, middleware);
  };
