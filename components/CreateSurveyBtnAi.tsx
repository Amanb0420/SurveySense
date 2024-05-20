"use client";

import { surveySchema, surveySchemaType } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";

function CreateSurveyBtnAi() {
  const router = useRouter();
  const form = useForm<surveySchemaType>({
    resolver: zodResolver(surveySchema),
  });

  async function onSubmit(values: surveySchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      router.push(`/aibuilder/${formId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">
          Generate using AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create surveys using AI</DialogTitle>
          <DialogDescription>Generate a survey with AI to start collecting responses</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter prompt</FormLabel>
                  <FormControl>
                    <Textarea rows={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSurveyBtnAi;