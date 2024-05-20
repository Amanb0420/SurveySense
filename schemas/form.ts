import {z} from "zod";

export const surveySchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
  });
  
export type surveySchemaType = z.infer<typeof surveySchema>;