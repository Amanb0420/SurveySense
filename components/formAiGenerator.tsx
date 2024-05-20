import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from './ui/textarea';
import GenerateSurvey, { CreateAIFormId } from '@/actions/generateAIform'
import { surveySchema, surveySchemaType } from '@/schemas/form';
import { CreateForm, UpdateFormContent } from '@/actions/form';
import { toast } from './ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImSpinner2 } from 'react-icons/im';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from './ui/form';
import { Input } from './ui/input';
import SaveFormBtn from './SaveFormBtn';
import router from 'next/router';

interface FormAiGeneratorProps {
  router: any;
}

const FormAiGenerator: React.FC<FormAiGeneratorProps> = ({ router }) => {
  const form = useForm<surveySchemaType>({
    resolver: zodResolver(surveySchema),
  });
  const resultRef = useRef<HTMLParagraphElement>(null);

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState<String>("");
  // function convertFormat(inputString: any) {
  //   // Safely parse the input string, assuming it's correctly formatted JSON
  //   let inputArray;
  //   try {
  //     inputArray = JSON.parse(inputString);
  //   } catch (e) {
  //     console.error("Error parsing input string:", e);
  //     return "[]"; // Return an empty array string if parsing fails
  //   }
    
  //   // Transform the array based on the new requirements with safety checks
  //   let transformedArray = inputArray.map((item: any, index: number) => {
  //     // Check if item and extraAttributes exist and have the expected structure
  //     if (!item || !item.extraAttributes || typeof item.extraAttributes.label !== 'string') {
  //       console.warn("Invalid item structure:", item);
  //       return null; // Return null for items that don't match the expected structure
  //     }
  
  //     return {
  //       id: String(index + 447), // Increment id starting from 447
  //       type: "SelectField",
  //       extraAttributes: {
  //         label: item.extraAttributes.label, // Use the original label
  //         helperText: "Helper text",
  //         placeHolder: "Value here...",
  //         required: false,
  //         options: ["New option", "New option", "New option", "New option"] // Static options
  //       }
  //     };
  //   }).filter(Boolean); // Remove any null values resulting from invalid item structures
    
  //   // Convert the transformed (and filtered) array back to a string
  //   return JSON.stringify(transformedArray, null, 2);
  // }
  
  
  // Usage example within your component
  const onFormCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
    const prompt = form.getValues('description');
  
    if (prompt) {
      try {
        const surveyResult = await GenerateSurvey(prompt);
        // Assuming surveyResult is already in the correct format as shown above
        // const surveyresult2 = JSON.stringify(surveyResult)
        console.log(typeof(surveyResult));
        console.log(surveyResult);
        const finalform = JSON.stringify(surveyResult);
        console.log(finalform);
        setFormData(finalform);
        setResult(surveyResult);
      } catch (error) {
        console.error('Error generating survey:', error);
        // Handle error here, such as displaying an error message or logging it
      }
    }
  };
  
    const onSubmit = async (values: surveySchemaType) => {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Success",
        description: "Form created successfully!",
      });
      router.push(`/builder/${formId}`);
      console.log(formId);
      console.log(formData);
      // await UpdateFormContent(formId, formData);
    } catch (error) {
      console.error('Error creating form:', error);
      // Handle error here, such as displaying an error message or logging it
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <p className="text-sm group-hover:text-primary">Create with AI</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Survey Using AI</DialogTitle>
          <DialogDescription>Write the prompt and get a survey form using AI</DialogDescription>
          <form onSubmit={onFormCreate}>
            <div className="grid gap-4 py-4">
              <Textarea {...form.register('description', { required: true })} placeholder="Write the prompt to create a survey" />
            </div>
            <Button disabled={form.formState.isSubmitting}>
              {!form.formState.isSubmitting ? <span>Generate</span> : <ImSpinner2 className="animate-spin" />}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
      {result && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Name of Survey</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField 
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </form>
          </Form>
          <DialogFooter>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting}>
              {!form.formState.isSubmitting ? <span>Save</span> : <ImSpinner2 className='animate-spin' />}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default FormAiGenerator;
function setFormData(convertedjson: string) {
  throw new Error('Function not implemented.');
}

