import React,{ useEffect, useReducer, useRef, useState } from "react";
import { endRecordAudio, getKeyEventValue, startRecordAudio } from "../../utils";
import micOnImg from "../../assets/mic_on.png";
import micOffImg from "../../assets/mic_off.png";
import { Button } from "../../components/buttons";
import { createCallRequest, sendVoiceRecogRequest } from "../../services";
import { MenuTitle } from "../../components/menus";
import { Confirm } from "../../components/confirms";

type DetailPurposePageProps = {
    selectedCategoryID: number;
    selectedCategoryString: String|null,
    goCall:Function,
}

type voiceRecogStateType = "ready"|"recording"|"analyzing"|"complete"
type voiceRecogReadyElementProps = {
    setVoiceRecogState:Function,
    onRecogComplete:Function
}
const VoiceRecogReadyElement = (props:voiceRecogReadyElementProps)=>{

    const ref =useRef<HTMLDivElement>(null);
    useEffect(()=>{
        console.log("focusing on button")
        ref.current!.focus();
     },[])
    function onKeyPress(evt:React.KeyboardEvent){
        console.log(evt.key)
    switch(evt.key){
        case (getKeyEventValue("RECORD")):
            props.setVoiceRecogState("recording")
            break;
        case (getKeyEventValue("SELECT")):
            props.onRecogComplete();
            break;
        default:
            console.log("not supported key event");
    }
}
    console.log("voice recog ready element")
    return (
    <div ref={ref} onKeyDown={(evt)=>onKeyPress(evt)} style={{display:"flex",flex:1,flexDirection:"column"}} tabIndex={0} >
        <div style={{alignItems:"center"}}>- 마이크 버튼을 누르고 용건을 말씀 해 주세요.</div>
        <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em",flexDirection:"column"}}>
            <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em"}}>
                <img src={micOffImg} />
            </div>
            <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"2em"}}>
                음성인식을 위해 우측 하단의 마이크 버튼을 눌러주세요.
            </div>
        </div>
        <Confirm label={"자세한 방문 목적을 밝히지 않으시려면 선택 버튼을 눌러주세요."}/>
        
        
    </div>
    )
}
const VoiceRecogRecordingElement = ({...props})=>{
    const ref =useRef<HTMLDivElement>(null);
    useEffect(()=>{
        console.log("focusing on button")
        ref.current!.focus();
        props.onStartRecord()
    },[])
    
    function onKeyPress(evt:React.KeyboardEvent){
        switch(evt.key){
            case (getKeyEventValue("RECORD")):
                props.onRecordComplete()
                break;
            
            default:
                console.log("not supported key event");
        }
    }
    return (
        <div ref={ref}  onKeyDown={(evt)=>{onKeyPress(evt)}} style={{display:"flex",flex:1,flexDirection:"column"}}  tabIndex={0}>
            <div style={{alignItems:"center"}}>- 마이크 버튼을 누르고 용건을 말씀 해 주세요.</div>
            <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em",flexDirection:"column"}}>
                <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em"}}>
                    <img src={micOnImg} />
                </div>
                <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"2em"}}>
                    음성 인식 중입니다.
                </div>
                <div>
                    음성인식을 마친 후 마이크 버튼을 다시 눌러 주세요.
                </div>
            </div>
        </div>
    )
}
const VoiceRecogAnalyzingElement = ({...props})=>{
    return (
        <div style={{display:"flex",flex:1,flexDirection:"column"}} >
            <div style={{alignItems:"center"}}>- 마이크 버튼을 누르고 용건을 말씀 해 주세요.</div>
            <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em",flexDirection:"column"}}>
                <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em"}}>
                    <img src={micOnImg} />
                </div>
                <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"2em"}}>
                    분석중입니다.
                </div>
                <div>
                    잠시만 기다려 주세요.
                </div>
            </div>
        </div>
    )
}
const VoiceRecogCompleteElement = ({...props})=>{
    const [buttonStatus,setButtonStatus] = useState<Boolean>(true)
    const goNextOrReturnRecording = ()=>{
        if (buttonStatus){
            props.onRecogComplete();
        }else{
            props.setVoiceRecogState("recording")
        }
    }
    return (
    <div style={{display:"flex",flex:1,flexDirection:"column"}} >
        <div style={{alignItems:"center"}}>- 마이크 버튼을 누르고 용건을 말씀 해 주세요.</div>
        <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em",flexDirection:"column"}}>
            <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"1em"}}>
                <img src={micOnImg} />
            </div>
            <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center",paddingTop:"2em"}}>
                분석이 완료되었습니다.
            </div>
            <div>
                {props.recogResult}
            </div>
            <Button value={buttonStatus} label={"위 용건이 맞으신가요?"} trueButtonText={"네"} falseButtonText={"아니오"} updateValue={(val:Boolean)=>setButtonStatus(val)} sendValueSelected={()=>goNextOrReturnRecording()} onRecordButtonPressed={()=>{}} />
        </div>
    </div>
    )
}
const DetailPurposeDisplay = ({...props})=>{
    console.log(props)
    switch(props.voiceRecogState){
        case "ready":
            return (
                <VoiceRecogReadyElement {...props} setVoiceRecogState = {(val:voiceRecogStateType)=>props.setVoiceRecogState(val)} onRecogComplete={()=>props.onRecogComplete()} />
            )
        case "recording":
            return (
                <VoiceRecogRecordingElement {...props} onStartRecord={()=>{props.startAudioRecording()}} onRecordComplete={()=>{props.endAudioRecording()}}/>
            )
        case "analyzing": 
            return (
                <VoiceRecogAnalyzingElement {...props} />
            )
        case "complete":
            return (
                <VoiceRecogCompleteElement {...props} />
            )
        default:
            return <div>null</div>
    }
}
export const DetailPurposePage = (props:DetailPurposePageProps)=>{
    const [voiceRecogState,setVoiceRecogState] = useState<voiceRecogStateType>("ready")
    const [recogResult,setRecogResult] = useState<String>("");
    const sendResult=()=>{
        createCallRequest({
            type:props.selectedCategoryID,
            visit_reason:recogResult
        })
    }
    const onVoiceRecogComplete=()=>{
        sendResult()
        props.goCall();
    }
    function startRecordAudio(){
        console.log("startRecord")
    }
    async function endRecordAudio(){
        console.log("endRecord")
        let result = await sendVoiceRecogRequest()
        setRecogResult(result)
        setVoiceRecogState("complete")
    }
    console.log(`recogState:${voiceRecogState}`)
    return (
        <div 
        style={{padding:"2em",display:"flex",flexDirection:"column",height:"calc( 100vh - 4em )"}}>
            <MenuTitle text={`| ${props.selectedCategoryString} > 세부 방문목적 입력`}/>

            <DetailPurposeDisplay {...props}
                voiceRecogState={voiceRecogState} 
                startRecord={()=>{startRecordAudio()}}
                onRecogComplete={()=>onVoiceRecogComplete()}
                setVoiceRecogState={(state:voiceRecogStateType)=>setVoiceRecogState(state)}
                startAudioRecording={()=>startRecordAudio()}
                endAudioRecording={()=>endRecordAudio()}
                recogResult={recogResult}
             />
        </div>
    )
}