import { Button } from '@chakra-ui/react'
import React from 'react'
import {MdPreview} from "react-icons/md"
import useDesigner from './hooks/useDesigner'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { FormElements } from './FormElements';


function PreviewDialogBtn() {
  const {elements} = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-blue-500 text-white text-md pt-1 pb-1 gap-2 px-2 py-2" style={{ borderRadius: "5px", margin:"15"}}>
          <MdPreview className='h-5 w-5'/>
           Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen
      max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className='px-4 py-2 border-b'>
          <p className="text-lg font-bold text-muted-foreground">
            Survey Preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how the survey looks like to users!
          </p>
        </div>
        <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4
        bg-[url(/texture.svg)]  dark:bg-[url(/texture-dark.svg)] overflow-y-auto'>
          <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full
          rounded-3xl p-8 overflow-y-auto'>
            {
              elements.map(element => {
                const FormComponent = FormElements[element.type].formComponent;
                return <FormComponent key={element.id} elementInstance={element} />
              })
            }
          </div>

        </div>
      </DialogContent>
    </Dialog>
   
  )
}

export default PreviewDialogBtn
