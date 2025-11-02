import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as projectDb from "./projectDb";
import { nanoid } from "nanoid";
import { aiChatRouter } from "./aiChatRouter";
import { aiRouter } from "./routers/ai";

export const appRouter = router({
  system: systemRouter,

  aiChat: aiChatRouter,

  ai: aiRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  projects: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await projectDb.getProjectsByUser(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await projectDb.getProject(input.id);
      }),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          thumbnail: z.string().optional(),
          sceneData: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const project = await projectDb.createProject({
          id: nanoid(),
          userId: ctx.user.id,
          ...input,
        });
        return project;
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          name: z.string().optional(),
          description: z.string().optional(),
          thumbnail: z.string().optional(),
          sceneData: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return await projectDb.updateProject(id, updates);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await projectDb.deleteProject(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
