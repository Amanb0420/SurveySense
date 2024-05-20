import { Button } from '@chakra-ui/react'
import React, { useTransition } from 'react'
import { HiSaveAs } from 'react-icons/hi'
import useDesigner from './hooks/useDesigner'
import { UpdateFormContent } from '@/actions/form'
import { toast } from './ui/use-toast'
import { FaSpinner } from 'react-icons/fa'
import { Router , useRouter } from 'next/router'

function SaveFormBtn({id}:{id: number}) {
    // const router = useRouter();
    console.log(id);
    const {elements} = useDesigner()
    const [loading, startTransition] = useTransition();
    const updateFormContent = async () =>{
        try{
            const jsonElements = JSON.stringify(elements);
            console.log(elements);
            // console.log(typeof(elements));
            // console.log(jsonElements);

            // console.log(typeof(jsonElements));
            await UpdateFormContent(id, jsonElements)
            
            toast({
                title: "Success",
                description:"Your form has been saved!"
            })
            console.log(jsonElements);
            // router.reload();
        } catch(error) {
            toast({
                title: "Error",
                description:"Something went wrong!",
                variant:"destructive"
            })
        }
    }
    return <Button variant={"outline"} className=" bg-blue-500 text-white text-md pt-1 pb-1 gap-2 px-2 py-2" 
    style={{ borderRadius: "5px", margin:"15"}} disabled={loading} onClick={() => {
        startTransition(updateFormContent);
    }}>
    <HiSaveAs className='h-5 w-5'/>
    Save
    {loading && <FaSpinner className='animate-spin' />}
</Button>
}

export default SaveFormBtn
