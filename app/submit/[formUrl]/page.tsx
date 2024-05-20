import React from 'react'
import { GetFormContentByUrl } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements'
import FormSubmitComponent from '@/components/FormSubmitComponent'
// import AnalyseSentiment from '@/actions/AnalyseSentiment'
async function SubmitPage({params}:{
    params:{
        formUrl: string
    }
}) {

    const form = await GetFormContentByUrl(params.formUrl)

    if(!form){
      throw new Error("Survey not found")
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];


    {formContent.map((element, index) => (
      console.log(element.id, element.extraAttributes)
    ))}
    return (
      <>
    <FormSubmitComponent formUrl = {params.formUrl} content = {formContent} />
    {/* <div >
      {formContent.map((element, index) => (
        <React.Fragment key={index}>
          <h3>{element.id}</h3>
          <p>{String(element.extraAttributes)}</p>
        </React.Fragment>
      ))}
    </div> */}

    </>
  )
}

export default SubmitPage

