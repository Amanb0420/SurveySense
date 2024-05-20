import {  Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState, useTransition } from 'react'
import {SidebarBtnElementDragOverlay} from "./SidebarBtnElement"
import { ElementsType, FormElements } from './FormElements';
import useDesigner from './hooks/useDesigner';
import { toast } from './ui/use-toast'
import { UpdateFormContent } from '@/actions/form'
import { incrementindexai } from "./fields/AiSelectField";
import { Form } from '@prisma/client';
function DragOverlayWrapper({id}:{id: number}) {
    
    const {elements} = useDesigner();
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);
    const [loading, startTransition] = useTransition();
    console.log(id);
    useDndMonitor({
        onDragStart: (event) =>{
            setDraggedItem(event.active)
            
            // console.log("DRAGGED ICON", event)
        },
        onDragCancel:() =>{
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
            if (draggedItem) { // Check if there is an item that was dragged
                startTransition(async () => {
                    try {
                        const jsonElements = JSON.stringify(elements);
                        console.log("Attempting to save the following data:", jsonElements);
                        await UpdateFormContent(id, jsonElements);
                        toast({
                            title: "Success",
                            description: "Your form has been saved!"
                        });
                    } catch (error) {
                        toast({
                            title: "Error",
                            description: "Something went wrong!",
                            variant: "destructive"
                        });
                    } finally {
                        setDraggedItem(null);
                        
                        // window.location.reload(); // Reset dragged item state
                    }
                });
            }
        }
    });

    if(!draggedItem) return null;

    let node = <div>No drag overlay</div>
    const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if(isDesignerElement){
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find(el => el.id===elementId)
        if(!element)node=<div>Element not found!</div>
        else{
            const DesignerElementComponent = FormElements[element.type].designerComponent;

            node = <div className='flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none'>
                <DesignerElementComponent elementInstance={element} />
                </div>
        }
    }

  return (

    <DragOverlay >{node}</DragOverlay>
  )
}

export default DragOverlayWrapper
