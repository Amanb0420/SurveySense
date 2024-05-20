import { client } from '@gradio/client';
import React from 'react'

interface Result {
    data: any;
}

 async function analyseSentiment(prompt: String) {
    {
        const app = await client("Amanb0420/sentiment_new", {});
        const result = await app.predict("/predict", [prompt]) as Result;
        
        const sentiment = result?.data ;
        console.log(sentiment)
        return sentiment;
    }
}

export default analyseSentiment
