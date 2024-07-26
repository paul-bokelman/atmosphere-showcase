import type { ServerRoute } from "~/types";
import bcrypt from "bcryptjs";

type HttpVerb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type AllowMethods = (allowedMethods: HttpVerb[]) => ServerRoute;

export const allowMethods: AllowMethods = (allowedMethods) => async (req, res, next) => {
  if (allowedMethods.includes(req.method as HttpVerb)) {
    next();
  } else {
    return res.status(405).send({
      status: "error",
      message: `Endpoint does not support ${req.method}, supported methods: [${allowedMethods.join(",")}]`,
    });
  }
};

type IsAuthenticated = (methods: HttpVerb[]) => ServerRoute;

export const isAuthenticated: IsAuthenticated = (methods) => async (req, res, next) => {
  // if method is not in the list, skip this middleware
  if (!methods.includes(req.method as HttpVerb)) {
    return next();
  }

  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).send({ status: "error", message: "Unauthorized" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const hashedKey = await bcrypt.hash(process.env.CU_KEY, 10);
    const isValid = await bcrypt.compare(token, hashedKey);

    if (!isValid) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }

    next();
  } catch (e) {
    return res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};
