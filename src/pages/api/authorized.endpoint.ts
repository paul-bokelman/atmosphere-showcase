import type { ServerRoute } from "~/types";
import { handler, allowMethods, isAuthenticated } from "~/lib/server";

export type IsAuthorizedParams = {};
export type IsAuthorizedPayload = { message: string };

const authorized: ServerRoute<IsAuthorizedParams, IsAuthorizedPayload> = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "Authorized" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default handler(allowMethods(["GET"]), isAuthenticated(["GET"]), authorized);
