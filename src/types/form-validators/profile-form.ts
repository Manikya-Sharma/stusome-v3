import { z } from "zod";

export const newProfileFormValidator = z
  .object({
    username: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only consist of numbers, letters and underscores",
      )
      .min(4)
      .max(15, "Maximum size allowed is 15"),
    displayName: z.string().min(4).max(20, "Maximum size allowed is 20"),
    email: z.string().email(),
    externalId: z.string().min(1),
    profilePicture: z.string().url().optional(),
  })
  .strict();

export type NewProfileFormValidatorType = z.infer<
  typeof newProfileFormValidator
>;
