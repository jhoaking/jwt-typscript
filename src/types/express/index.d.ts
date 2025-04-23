
import { AuthType } from "../authTypes";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: AuthType;
    }
  }
}