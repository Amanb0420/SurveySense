"use client";
import React, { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";
import Select from "react-select";
import { Input } from "./ui/input";
import Sentiment from 'sentiment';
import BarChartExcel from "./BarChartExcel";
import { SentimentNeutralTwoTone } from "@mui/icons-material";

const acceptedFileTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
const sentiment = new Sentiment();

function ExcelAnalytics() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<{ value: string; label: string } | null>(null);
  const [columnNames, setColumnNames] = useState<{ value: string; label: string }[]>([]);
  const [posCounts, setposCounts] = useState({});
  const [negCounts, setnegCounts] = useState({});
  const [neuCounts, setneuCounts] = useState({});

  const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    setFile(uploadedFile);
    setSelectedColumn(null);
    setColumnNames([]);
  }, []);

  const handleReadFile = useCallback(async () => {
    if (!file) return;
    if (!acceptedFileTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload an Excel file (.xlsx or .xls).");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
        const columnOptions = headers.map((header, index) => ({ value: index.toString(), label: header.toString() }));
        setColumnNames(columnOptions);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
      }
    };
    fileReader.readAsArrayBuffer(file);
  }, [file]);

  const handleColumnButtonClick = useCallback(async () => {
    if (!selectedColumn || !file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          .map(row => row[parseInt(selectedColumn.value)])
          .slice(1); // Skip header

        let posCount = 0, negCount = 0, neuCount = 0;
        jsonData.forEach(text => {
          const result = sentiment.analyze(text);
          if (result.score > 0) posCount++;
          else if (result.score < 0) negCount++;
          else neuCount++;
        });
        console.log([posCount , negCount , neuCount]);
        setposCounts(posCount);
        setnegCounts(negCount);
        setneuCounts(neuCount);
        
      } catch (error) {
        console.error("Error processing file data:", error);
      }
    };
    fileReader.readAsArrayBuffer(file);
  }, [file, selectedColumn]);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="mt-5 flex flex-row gap-4 justify-between">
        <div className="flex-1">
          <div className="mb-5">
            <Input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
          </div>
          <Button onClick={handleReadFile}>Upload</Button>
        </div>
        <div className="flex-1">
          <div className="mb-5">
            <Select
              value={selectedColumn}
              onChange={setSelectedColumn}
              options={columnNames}
              getOptionLabel={option => <div className="text-black">{option.label}</div>}
              getOptionValue={option =><div className="text-black"> {option.value}</div>}
              placeholder="Select Column"
            />
          </div>
          <Button onClick={handleColumnButtonClick}>Get Data</Button>
        </div>
      </div>
      {posCounts > 0 || negCounts > 0 || neuCounts > 0 ? (
        <BarChartExcel data={{
          positive: posCounts,
          negative: negCounts,
          neutral: neuCounts,
        }} />
      ) : null}
    </div>
  );
}

export default ExcelAnalytics;

function analyzeSentiment(text: string) {
    const result = sentiment.analyze(text);
    if (result.score > 0) {
        return "positive";
    } else if (result.score < 0) {
        return "negative";
    } else {
        return "neutral";
    }
}