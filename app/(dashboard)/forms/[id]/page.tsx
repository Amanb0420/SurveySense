// "use client"
import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import React, { ReactNode, useEffect, useState } from "react";
import { StatsCard } from "../../page";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Sentiment from 'sentiment';
import BarChart from "./Barchart";
import * as stopword from 'stopword';

// import extractTopics from '@/actions/extractTopics';    
import {extractTopNouns} from "@/actions/extractTopics";

// const stemmer = require('stemmer');
async function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  let numberOfReviews =0;
  const bounceRate = 100 - submissionRate;
  const sentimentData = await TextFieldContent({ id: Number(id) });
  
const topicData = await TopicModellingFunc({ id: Number(id) })
  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container py-10 ">
        <StatsCard
          title="Total visits"
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />

        <StatsCard
          title="Total submissions"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />

        <StatsCard
          title="Submission rate"
          icon={<HiCursorClick className="text-green-600" />}
          helperText="Visits that result in form submission"
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />

        <StatsCard
          title="Bounce rate"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="Visits that leaves without interacting"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="py-4 border-b  border-muted border-t">
      <div className="container pt-10 max-h-[1000px] max-w-[1000px] " >
        <div className="py-4 ">
          <h1 className="text-bold text-3xl">
            Sentiment Distribution
          </h1>
        </div>
        <BarChart data={{
          positive: (sentimentData[0] / sentimentData[3])*100,
          negative: (sentimentData[1] / sentimentData[3])*100,
          neutral: (sentimentData[2] / sentimentData[3])*100
        }} />
      </div>
       
      </div>
      <div className="container pt-10 bg-background">
        <TableComponent data={topicData} />
      </div>
      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
      
    </>
  );
}

export default FormDetailPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
      case "Rating10Field":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border overflow-auto" >
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.id} className="">
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="text-muted-foreground text-right uppercase">Submitted at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <RowCell key={column.id} type={column.type} value={row[column.id]} />
                  ))}
                  <TableCell className="text-muted-foreground text-right">
                    {formatDistance(row.submittedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
interface Result {
  data: any;
};


const sentiment = new Sentiment();

function analyzeSentiment(text: any) {
    const result = sentiment.analyze(text);
    if (result.score > 0) {
        return "positive";
    } else if (result.score < 0) {
        return "negative";
    } else {
        return "neutral";
    }
}

async function TextFieldContent( {id}:{id:number}) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const textFieldContents: any[] = [];

  // let topics =  extractTopics("This is review about college. College is great professor is good professor is amazing. campus is bad")
  // console.log(topics);
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    formElements.forEach((element) => {
      if (element.type === "TextAreaField" && content[element.id]) {
        textFieldContents.push(content[element.id]);
      }
    });
  });

  let posCount = 0, negCount = 0, neuCount = 0 , count= 0;
  
  for (let text of textFieldContents) {
    let sentiment = analyzeSentiment(text);
    
    count=count+1;
    if (sentiment === 'positive') {
      posCount++;
    } else if (sentiment === 'negative') {
      negCount++;
    } else {
      neuCount++;
    }
  }
  
  
  

  return [posCount ,negCount , neuCount, posCount+negCount+neuCount];
}


async function TopicModellingFunc({id}:{id:number}){
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const textFieldContents: any[] = [];

  // let topics =  extractTopics("This is review about college. College is great professor is good professor is amazing. campus is bad")
  // console.log(topics);
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    formElements.forEach((element) => {
      if (element.type === "TextAreaField" && content[element.id]) {
        textFieldContents.push(content[element.id]);
      }
    });
  });

  // const topicsMap = new Map();
  // let topicsArray: string[] = [];
  const topicsArray: string[] = [];
for (let text of textFieldContents) {
    let topics = extractTopNouns(text);
    topicsArray.push(...topics.split(','));
}
  // for (let text of textFieldContents) {
  //   console.log(text)
  //   let topics = extractTopNouns(text)
  //   let cleanedTopics = stopword.removeStopwords(topics.split(',').map(topic => topic.trim())).join(',');
  //   // console.log(clea)
  //   let uniqueTopics = Array.from(new Set(cleanedTopics.split(','))).join(',');
  //   topicsArray.push(...uniqueTopics.split(','));
  //   // let topicsArraytemp = topics.split(',')
  //   // topicsArraytemp.forEach(element =>{
  //   //   topicsArray.push(element);
  //   // })
  //   // console.log(topicsArray)

  let cleanedTopics = stopword.removeStopwords(topicsArray.map(topic => topic.trim()), ['college']).filter(topic => topic.length > 2);

  const topicsMap = new Map();


  // }
  // topicsArray.push('A nurturing environment')
  // topicsArray.push('community')
  topicsArray.forEach(item => {
    if(topicsMap[item.trim().toLowerCase()]){
      topicsMap[item.trim().toLowerCase()]++;
    }else{
      topicsMap[item.trim().toLowerCase()] = 1
    }
  })

  
  const sortedOccurrences = Object.entries(topicsMap).sort((a, b) => b[1] - a[1]);
  const top5 = sortedOccurrences.slice(0, Math.min(sortedOccurrences.length, 4));
  // Convert the top5 array back to an object if needed
  const top5Map = Object.fromEntries(top5);
  
  const top5Keys = Object.keys(top5Map);
  console.log(top5Keys)
  return top5Keys;



}
// TableComponent.js

const TableComponent = ({ data }) => {  return (
    <table className="min-w-full divide-x divide-gray-200 shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-secondary" >
        <tr>
          <th className="px-6 py-3 text-left text-xl font-medium text-primary text-bold ">
            Top Most talked about Topics!
          </th>
        </tr>
      </thead>
      <tbody className="bg-background divide-x divide-gray-200 ">
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-m text-bold text-primary font-medium hover:bg-secondary hover:text-primary text-capitalize border">{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <TableCell>{node}</TableCell>;
}

