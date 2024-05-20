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



// const [formDescriptionLoaded, setFormDescriptionLoaded] = useState(false);
function FormBuilder({ form }: { form: Form  }) {
  
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

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
  
    // Check if elements array is empty and initialize with default fields
    if (elements.length === 0) {
      const defaultTitleField = FormElements.TitleField.construct(idGenerator());
      defaultTitleField.extraAttributes = {
        title: form.name // Assuming 'title' is the attribute to set the title in TitleField
      };
      const ratinglabel = "Rate us";
      const defaultSelectField = FormElements.Rating10Field.construct(idGenerator());
      defaultSelectField.extraAttributes = {
        label: ratinglabel as string,
        options:  ['1','2','3','4','5','6','7','8','9','10'], // Sample options
        required: true
      };
  
      const defaultTextField = FormElements.TextAreaField.construct(idGenerator());
      defaultTextField.extraAttributes = {
        label: "Leave Comments .....",
        helperText: "Enter some commnets here",
        required: true,
        placeHolder: "Text here..."
      };
  
      // Setting up the default elements array
      setElements([defaultTitleField, defaultSelectField, defaultTextField]);
    } else {
      setElements(elements);
    }
  
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
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
export default FormBuilder;
