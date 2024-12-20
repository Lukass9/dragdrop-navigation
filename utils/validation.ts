import { z } from "zod";

export const formSchema = z.object({
  label: z.string().min(1, { message: "Nazwa jest wymagana" }),
  url: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
