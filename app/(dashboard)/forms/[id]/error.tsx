"use client";
import { Button, Link } from '@chakra-ui/react';
import React, { useEffect } from 'react'

function ErrorPage({error}:{error: Error}) {
useEffect(() => console.error(error), [error]);

  return (
    <div className='flex w-full h-full flex-col items-center jsutify-center'>
        <h2 className='text-destructive text-4xl'>Something went wrong!</h2>
        <div className='pt-50'>
            <Button className=" bg-blue-500 text-white text-md pt-1 pb-1" style={{ borderRadius: "5px", margin:"15"}}>
                <Link href={`/`}>
                <span className="px-2 py-2">Go back to home</span>
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default ErrorPage
