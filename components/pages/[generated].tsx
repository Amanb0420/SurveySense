import React, { useState } from 'react';
import GenerateSurvey from '../generateForm';

const FormAiGenerator = () => {
  const [result, setResult] = useState<any>(null);

  const onFormCreate = async () => {
    const prompt = 'example prompt';
    const surveyResult = await GenerateSurvey(prompt);
    setResult(surveyResult);
  }

  return (
    <div>
      <button onClick={onFormCreate}>Create Survey</button>
      {result && (
        <div>
          <h2>Generated Survey</h2>
          <pre>{
            JSON.stringify(
              result,
              null,
              2
            )
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
          }</pre>
        </div>
      )}
    </div>
  );
}

export default FormAiGenerator;