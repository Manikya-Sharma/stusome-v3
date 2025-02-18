import { z } from "zod";

export const newChannelFormValidator = z.object({
  name: z.string().min(4, "Name must have at-least 4 characters"),
  descriptor: z
    .string()
    .min(4, "Descriptor must have at-least 4 characters")
    .regex(
      /^[A-Za-z0-9\_\-]+$/,
      "channel descriptor can only contain numbers, ascii letters, underscore and dashes",
    ),
  brief: z.string().min(10, "Brief must have at-least 10 characters"),
});

export type NewChannelFormValidatorType = z.infer<
  typeof newChannelFormValidator
>;
