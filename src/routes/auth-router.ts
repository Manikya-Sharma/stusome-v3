import { db } from "@/lib/db";
import { privateProcedure, publicProcedure, router } from "@/lib/trpc/init";
import { getDefaultProfilePreferences } from "@/lib/utils";
import { newProfileFormValidator } from "@/types/form-validators/profile-form";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  createProfile: publicProcedure
    .input(newProfileFormValidator)
    .mutation(async ({ input }) => {
      try {
        await db.user.create({
          data: {
            displayName: input.displayName,
            username: input.username,
            email: input.email,
            externalId: input.externalId,
            profilePicture: input.profilePicture,
            preferences: getDefaultProfilePreferences(),
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Username already exists",
            });
          }
        }
      }
    }),
});
