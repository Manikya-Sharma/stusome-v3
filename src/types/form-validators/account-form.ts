import { z } from "zod";

export const newAccountFormValidator = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only consist of numbers, letters and underscores",
    )
    .min(4, "Username must have at-least 4 characters")
    // Is 15 really sufficient?
    .max(15, "Maximum size allowed is 15"),
  displayName: z
    .string()
    .min(4, "Display Name must have at-least 4 characters")
    .max(20, "Maximum size allowed is 20"),
});

export type NewAccountFormValidatorType = z.infer<
  typeof newAccountFormValidator
>;
