import { z } from "zod";

export const postLoginPayloadSchema = z.object({
  email: z.string({ message: "Harus diisi" }).email("Email tidak valid"),
  password: z.string({ message: "Harus diisi" }),
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
    email: z.string({ message: "Harus diisi" }).email("Email tidak valid"),
    nama: z.string({ message: "Harus diisi" }),
    no_telp: z.string({ message: "Harus diisi" }),
    password: z.string({ message: "Harus diisi" }),
    confirm_password: z.string({ message: "Harus diisi" }),
    role_id: z.number().optional(),
  })
  .refine((value) => value.password === value.confirm_password, {
    message: "Password tidak sama",
    path: ["confirm_password"],
  });

export type PostRegisterPayload = z.infer<typeof postRegisterPayloadSchema>;
export type PostRegisterResponseError = {
  error: string;
};

export const getArticlesQuerySchema = z.object({
  type: z.enum(["rekomendasi"]).optional(),
});
export type GetArticleQuery = z.infer<typeof getArticlesQuerySchema>;
export type GetArticleResponseSuccess = {
  data: {
    id: string;
    judul: string;
    img_url: string;
    content: string;
    harga: number;
  }[];
};
export type GetArticleDetailResponseSuccess = {
  data: {
    id: string;
    judul: string;
    img_url: string;
    content: string;
    harga: number;
  };
};

export type GetTravelBranchResponseSuccess = {
  data: {
    created_at: string;
    deleted_at: any;
    id: number;
    nama: string;
    updated_at: string;
  }[];
  message: string;
  success: boolean;
};

export const travelScheduleQuerySchema = z.object({
  from: z.string(),
  to: z.string(),
  date: z.date(),
});
export type TravelScheduleQuery = z.infer<typeof travelScheduleQuerySchema>;
export type TravelScheduleResponseSuccess = {
  data: {
    availableSeat: number;
    carModel: string;
    carSeat: number;
    departureDate: string;
    destinationCity: string;
    destinationDepartureDate: string;
    originCity: string;
    originDepartureDate: string;
    price: number;
  }[];
  message: string;
  success: boolean;
};
export type TravelDoorToDoorParams = {
  point: string;
};
export type TraveDoorToDoorResponseSuccess = {
  data: {
    nama: string;
  }[];
  message: string;
  success: boolean;
};
