// script.js
//import user from "./sample.json" assert { type: 'json' };
//console.log(user)
//const filename=prompt("Input a json filename:");
"use client";
import React,{useEffect} from "react";
import saveAs from "./filesaver.js";
import content from "./sample.json" with {type:"json"};
import ReactDOM from "react-dom/client";
import * as XLSX from "xlsx";

//import { createRoot } from 'react-dom/client'


//const content=require(filename);
var data=JSON.parse(JSON.stringify(content));
data.forEach((item) => {
    item["Email aliases"]=[item["First name"]+item["Address"].split(", ")[0].split(" ").join("")
+"@platihub.com",item["Last name"]+item["Birthplace"].split(", ")[1].split(" ").join("_")+"@platihub.com"
,item["Last name"]+"."+item["First name"]+item["Phone number"].split("-")[1]
+"@platihub.com"];
});
console.log(JSON.stringify(data));

//activateDocument();


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const saveAsExcel = (buffer, filename)=>{
    const data = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, filename+new Date().getTime()+EXCEL_EXTENSION);
}
function downloadAsExcel(){
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
        Sheets: {
            'data' : worksheet
        },
        SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    console.log(excelBuffer);
    saveAsExcel(excelBuffer, 'data_template');
}
function App(){
    useEffect(()=>{
        window.document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4);
    },[]);
    /*** 
    const saveAsExcel = (buffer, filename)=>{
        const data = new Blob([buffer], {type: EXCEL_TYPE});
        saveAs(data, filename+new Date().getTime()+EXCEL_EXTENSION);
    }
        ***/
    return (
        <div>
          <pre id="json"></pre>
          <button onClick={downloadAsExcel}>Download as Excel</button>
        </div>
      );
};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
//createRoot(document.getElementById('root')).render(<App />);

//downloadAsExcel();
