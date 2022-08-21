import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { InitPage } from './pages/init';
import { DetailPurposePage } from './pages/detail-purpose';
import { CallingStatusPage } from './pages/calling';
import { SelectPurposePage } from './pages/select-purpose';

type pageStateType = "init"|"select_purpose"|"detail_purpose"|"calling";
function App() {
  const [pageState,setPageState] = useState<pageStateType>("init")
  switch(pageState){
    case "init":
      return (
        <InitPage onPressCall={()=>setPageState("select_purpose")}></InitPage>
      );
    case "select_purpose":
      return (
        <SelectPurposePage onPressSelect={()=>setPageState("detail_purpose")}/>
      )
    case "detail_purpose":
      return(
        <DetailPurposePage onPressCall={()=>setPageState("calling")}/>
      )
    case "calling":
      return(
        <CallingStatusPage onTimeOut={()=>setPageState("init")}/>
      )
    default:
      return (
        <div>status not valid</div>
      )

  }
  
}

export default App;
