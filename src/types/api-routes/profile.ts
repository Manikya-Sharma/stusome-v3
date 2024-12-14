import { z } from "zod";

export const profile_post_zod = z
  .object({
    username: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only consist of numbers, letters and underscores"
      )
      .max(15, "Maximum size allowed is 15"),
    displayName: z.string().max(20, "Maximum size allowed is 15"),
    email: z.string().email(),
    externalId: z.string().min(1),
  })
  .strict();

export type PROFILE_POST = z.infer<typeof profile_post_zod>;