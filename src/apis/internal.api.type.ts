import { z } from "zod";

export const postLoginPayloadSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string(),
});
export type PostLoginPayload = z.infer<typeof postLoginPayloadSchema>;
export type PostLoginResponseSuccess = {
  data: {
    created_at: string;
    deleted_at?: string;
    email: string;
    id: number;
    master_cabang_id: number;
    nama: string;
    no_telp?: string;
    role_id: number;
    token: string;
    type: "bearer";
    updated_at: string;
  };
};
export type PostLoginResponseError = {
  message: string;
  status: string;
};

export const postRegisterPayloadSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    nama: z.string(),
    no_telp: z.string(),
    password: z.string(),
    confirm_password: z.string(),
    role_id: z.number().optional(),
  })
  .refine((value) => value.password === value.confirm_password, {
    message: "Password tidak sama",
    path: ["confirm_password"],
  });

export type PostRegisterPayload = z.infer<typeof postRegisterPayloadSchema>;