import type { Middleware, AddParameters, ServerRoute } from "~/types";

// bro we don't talk about this, if you're reading this, do ya boy a favor and don't look at this code

type Handler = <T extends Middleware[], U extends ServerRoute<any, any>>(
  ...middleware: [...T, U]
) => (...args: Parameters<Middleware>) => Promise<void>;

type ExecuteMiddleware = AddParameters<Middleware, [middleware: Middleware[], index?: number]>;

// recursive function that executes the middleware functions
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

// receives an array of middleware functions and recursively executes them
export const handler: Handler =
  (...middleware) =>
  async (req, res, next) => {
    await execMiddleware(req, res, next, middleware);
  };
