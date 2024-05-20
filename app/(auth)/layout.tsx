"use client";

import { UserButton } from '@clerk/nextjs';
import React, { ReactNode } from 'react'
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/Logo';
import { ThemeProvider } from '@/components/providers/theme-provider';
function layout({children}:{children : ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
        <nav className='flex justify-between items-center border-b border border h-[60px] px-4 py-2'> 
            <div className='flex gap-4 items-center'>
            <Logo />
            </div>
            <div className='flex gap-4 items-center'>
            <ThemeSwitcher />
            
            </div>
        </nav>
        
      <main className="flex w-full flex-grow h-full items-center justify-center">{children}</main>
    </div>
  )
}

export default layout;