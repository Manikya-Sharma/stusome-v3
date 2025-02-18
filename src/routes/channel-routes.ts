import { db } from "@/lib/db";
import { privateProcedure, router } from "@/lib/trpc/init";
import { getDefaultChannelPermissions } from "@/lib/utils";
import { newChannelFormValidator } from "@/types/form-validators/channel-form";
import { TRPCError } from "@trpc/server";

export const channelRouter = router({
  createChannel: privateProcedure
    .input(newChannelFormValidator)
    .mutation(async ({ ctx, input }) => {
      const { brief, descriptor, name } = input;
      if (descriptor === "new") {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      await db.channel.create({
        data: {
          brief,
          descriptor: `:${descriptor}`,
          name,
          permissions: getDefaultChannelPermissions(),
          members: {
            connect: {
              id: ctx.user.id,
            },
          },
          mods: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
});
