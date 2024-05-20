import prisma from "@/lib/prisma";
import { surveySchema, surveySchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
import { client } from "@gradio/client";
import { UpdateFormContent } from "./form";
class UserNotFoundErr extends Error {}
interface Result {
    data: any;
  }
export default async function GenerateSurvey(prompt: string) {
    const app = await client("Amanb0420/Survey_Gen_new", {});
    const result = await app.predict("/predict", [prompt]) as Result;
    // if(result?.data===null){}
    // console.log(String(result?.data));
    // console.log(typeof(result?.data[0]));
    return (result?.data as string);
}
