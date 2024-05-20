"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import Designer from "./Designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import FormService from "@/actions/formservice";
import { Router, useRouter } from "next/router";
import { FormElements } from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";
// import GenerateSurvey from "@/actions/generateAIform";
import { client } from "@gradio/client";

const collegearr =  [ [ ' How important was the cost of tuition in your decision to attend college?', [ 'a) Very important', 'b) Somewhat important', 'c) Not very important', 'd) Not at all important' ] ], [ ' Which of the following best describes your current field of study?', [ 'a) STEM (science, technology, engineering, math)', 'b) Business', 'c) Humanities', 'd) Social sciences' ] ], [ ' Have you ever considered transferring to another college or university?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the quality of instruction you have received at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Are you currently employed while attending college?', [ 'a) Yes, full-time', 'b) Yes, part-time', 'c) No' ] ], [ ' How do you plan to pay for your college education? (Select all that apply)', [ 'a) Scholarships', 'b) Grants', 'c) Loans', 'd) Parent/family contributions e) Personal savings' ] ], [ ' Have you ever participated in a study abroad program?', [ 'a) Yes', 'b) No' ] ], [ ' How important was the location of the college or university in your decision to attend?', [ 'a) Very important', 'b) Somewhat important', 'c) Not very important', 'd) Not at all important' ] ], [ ' What type of degree are you pursuing?', [ "a) Bachelor's", "b) Associate's", "c) Master's", 'd) Doctoral' ] ], [ 'How would you rate the availability of internship opportunities at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt overwhelmed by the workload in your courses?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the diversity of the student body at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever considered taking a gap year before attending college?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the social life at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Are you a member of any student organizations or clubs?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the support provided by academic advisors at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt that your academic advisor was not helpful or supportive?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the availability of resources for mental health and wellness at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever utilized resources for mental health and wellness at your college or university?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the quality of the facilities and amenities at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Are you satisfied with the dining options available on campus?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the safety and security measures in place at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt unsafe or threatened while on campus?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the availability of career counseling and job placement services at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever utilized career counseling and job placement services at your college or university?', [ 'a) Yes', 'b) No' ] ], [ ". How would you rate the convenience and accessibility of the college or university's location?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever lived on campus?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the quality of the housing options available on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever experienced any issues with the campus housing facilities or staff?', [ 'a) Yes', 'b) No' ] ], [ '0. How would you rate the overall value of your college or university experience?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  Would you recommend your college or university to prospective students?', [ 'a) Yes', 'b) No' ] ], [ ' Have you ever felt that your college or university experience has prepared you well for your future career?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of academic challenge in your courses?', [ 'a) Very challenging', 'b) Somewhat challenging', 'c) Not very challenging', 'd) Not at all challenging' ] ], [ '. Have you ever felt bored or unchallenged in your courses?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of interaction and engagement with your professors and instructors?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your professors or instructors were not available or accessible outside of class?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of collaboration and teamwork in your courses?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your courses were too focused on memorization rather than critical thinking?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of diversity in the curriculum and course offerings at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. Have you ever felt that your college or university experience has helped you develop your critical thinking skills?', [ 'a) Yes', 'b) No' ] ], [ '  How would you rate the level of support provided by the college or university for students with disabilities?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt that your college or university experience has helped you develop your time management skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of flexibility in the curriculum and course offerings at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your college or university experience has helped you develop your leadership skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of collaboration between students at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your college or university experience has helped you develop your communication skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of support provided by the college or university for students pursuing internships or career opportunities?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your college or university experience has helped you develop your problem-solving skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of campus involvement and engagement in social and political issues?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. Have you ever felt that your college or university experience has helped you develop your global perspective and cultural awareness?', [ 'a) Yes', 'b) No' ] ] ]
async function GenerateSurvey(prompt: string): Promise<string> {
  const app = await client("Amanb0420/Survey_Gen_new", {});
  const result = await app.predict("/predict", [prompt]);
  return result?.data; // Ensure this returns a string or handle conversion
}

// const [formDescriptionLoaded, setFormDescriptionLoaded] = useState(false);
function FormBuilderAi({ form }: { form: Form  }) {
  
  let formdesc = (form.description);
  
  
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  // formdescmain = form.description;
  // console.log(formdescmain);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });



  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  type ParsedQuestion = [string, string[]];

  function parseSurvey(inputText: string): ParsedQuestion[] {
    if (typeof inputText !== 'string') {
      console.error('Invalid input: inputText must be a string');
      console.log(typeof(inputText));
      return [];
  }
    const splitRegex = /(\d+\..+?(?=\d+\.|$))/gs; // Regex to split by question number
    const questions = inputText.match(splitRegex) || [];

    return questions.map(question => {
        // Extract the question text before the first answer option
        const questionSplit = question.match(/^(.+?)a\)/);
        const questionText = questionSplit ? questionSplit[1].trim() : '';
        
        // Extract answers by removing the question part and splitting by letter options
        const answers = question
            .replace(questionText, '')
            .trim()
            .split(/\s[a-z]\)/)
            .map(answer => answer.replace(/^[a-z]\)\s*/, '').trim())  // Cleaning up the answer labels
            .filter(answer => answer); // Remove any empty strings from the array

        return [questionText, answers] as ParsedQuestion;
    });
}

  useEffect(() => {
    async function setupForm() {
      if (isReady) return;
      const elements = JSON.parse(form.content);
  
      // Check if elements array is empty and initialize with default fields
      if (elements.length === 0) {
        const defaultAIElements = [];
        const defaultTitleField = FormElements.TitleField.construct(idGenerator());
        defaultTitleField.extraAttributes = { title: form.name };
        defaultAIElements.push(defaultTitleField);

        // Generating a label from the form's description
         // Async call to get the label string
        let response:string = await GenerateSurvey(form.description);
        
        let responsearr : ParsedQuestion[] = parseSurvey(response[0]);
        for (let i = 0; i < 10; i++) {
          
          // let j = Math.floor(Math.random() * 49) + 1; // Example random logic, adjust as necessary
          let aioptionField = FormElements.SelectField.construct(idGenerator());
          let [first , ...rest] = responsearr[i][1]
          aioptionField.extraAttributes = {
            label: responsearr[i][1][0], // Use the fetched label
            placeholder : "Select an option" ,
            helperText: " ",
            options: [...rest], // Example options, adjust as necessary
            required: true
          };
          defaultAIElements.push(aioptionField);
        }
        const defaultSelectField = FormElements.Rating10Field.construct(idGenerator());
      defaultSelectField.extraAttributes = {
        label: "Rate us ",
        placeholder : "Select an option" ,
            helperText: " ",
        options:  ['1','2','3','4','5','6','7','8','9','10'], // Sample options
        required: true
      };
      defaultAIElements.push(defaultSelectField);
      const defaultTextField = FormElements.TextAreaField.construct(idGenerator());
      defaultTextField.extraAttributes = {
        label: "Leave Comments ..... ",
        helperText: "Enter some commnets here",
        required: true,
        placeHolder: "Text here..."
      };
      defaultAIElements.push(defaultTextField);
        
        setElements(defaultAIElements);
      } else {
        setElements(elements);
      }
  
      setSelectedElement(null);
      const readyTimeout = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(readyTimeout);
    }

    setupForm();
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              Survey Published!
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Copied!",
                    description: "Link copied to clipboard",
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
            {/* {form.description} */}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/texture.svg)] dark:bg-[url(/texture-dark.svg)]">
          <Designer id = {form.id}/>
        </div>
      </main>
      <DragOverlayWrapper id={form.id}/>
    </DndContext>
  );
}
export default FormBuilderAi;
