import { type ZodIssue } from "zod";

// this is called a discriminating union, if status is success ts will know we expect data, if error we know we expect error prop
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: ZodIssue[] | string };
