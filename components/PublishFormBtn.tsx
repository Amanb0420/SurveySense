import { Button } from '@chakra-ui/react'
import React, { startTransition, useState, useTransition } from 'react'
import { MdOutlinePublish } from 'react-icons/md'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from './ui/alert-dialog'
import { FaIcons } from 'react-icons/fa'
import { toast } from './ui/use-toast'
import { PublishForm } from '@/actions/form'
import { useRouter } from 'next/navigation'

function PublishFormBtn({id}:{id: number}) {

    const [loading, startTransition] = useTransition();
    const router = useRouter();
    async function publishForm(){
        try{
            await PublishForm(id)
            toast({
                title:"Success",
                description:"Your survey has been published!"
            })
            router.refresh();
        }catch (error){
            toast({
                title:"Error",
                description:"Something went wrong!"
            })
        }
    }

    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className=" bg-blue-500 text-white text-md pt-1 pb-1 gap-2 px-2 py-2" style={{ borderRadius: "5px", margin:"15"}}>
                <MdOutlinePublish className='h-5 w-5'/>
                Publish
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. After publishing, you will not be able to edit this survey!<br></br>
                    <span className="font-medium">
                        By publishing this survey, you will make it available to the public. Submissions will be collected post publishing.
                    </span>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled = {loading} onClick={e => {
                    e.preventDefault();
                    startTransition(publishForm)
                }}>Proceed {loading && <FaIcons className='animate-spin' />}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)
}

export default PublishFormBtn
