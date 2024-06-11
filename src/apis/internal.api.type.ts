import { z } from "zod";

export const postLoginPayloadSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string(),
});

export type PostLoginPayload = z.infer<typeof postLoginPayloadSchema>;

export const postRegisterPayloadSchema = z.object({
  email: z.string().email(),
  nama: z.string(),
  password: z.string(),
  no_telp: z.string(),
  master_cabang_id: z.number(),
});

export type PostRegisterPayload = z.infer<typeof postRegisterPayloadSchema>;
