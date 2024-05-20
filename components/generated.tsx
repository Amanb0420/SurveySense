// pages/generated.tsx

import React from 'react';
import { useRouter } from 'next/router';

const GeneratedSurveyPage: React.FC = () => {
  const router = useRouter();
  // Extract the result from the query parameters
  const result = router.query.result;

  // Handle case where result is not available or invalid
  if (!result || typeof result !== 'string') {
    return <div>Error: Unable to load survey</div>;
  }

  // Parse the result JSON
  let surveyData;
  try {
    surveyData = JSON.parse(decodeURIComponent(result));
  } catch (error) {
    console.error('Error parsing survey data:', error);
    return <div>Error: Unable to load survey</div>;
  }

  // Render the survey using the survey data
  return (
    <div>
      <h1>Generated Survey</h1>
      {/* Render survey questions and form using surveyData */}
      {/* Example: */}
      {surveyData.questions.map((question: string, index: number) => (
        <div key={index}>
          <p>Question {index + 1}: {question}</p>
          {/* Render form inputs for each question */}
        </div>
      ))}
    </div>
  );
}

export default GeneratedSurveyPage;
