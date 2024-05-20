import React from 'react'
import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import FormBuilderAi from '@/components/FormBuilderAi';
async function BuilderPageAi({params,}:{params:{
    id: string;
    };
}) {
    const {id} = params;
    const form = await GetFormById(Number(id));
    if(!form) {
        throw new Error("form not found");
    }
  return <FormBuilderAi form={form} />
}

export default BuilderPageAi
