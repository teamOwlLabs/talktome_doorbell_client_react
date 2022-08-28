import { useEffect, useRef } from "react";
import { getKeyEventValue } from "../../utils";

type ConfirmProps={
    label:String,
    setVoiceRecogState:Function,
    onVoiceRecogComplete:Function

}
const Confirm = (props:ConfirmProps)=>{
    const recogReadyRef =useRef<HTMLSpanElement>(null);
    useEffect(()=>{
        console.log("focusing on confirm}",recogReadyRef.current?.focus)
        if(recogReadyRef.current){
            recogReadyRef.current.focus();
        }
    },[]) 
    const onKeyPress = (evt:React.KeyboardEvent)=>{
        console.log(evt)
        switch(evt.key){
            case (getKeyEventValue("RECORD")):
                props.setVoiceRecogState("recording")
                break;
            case (getKeyEventValue("SELECT")):
                console.log("onVoiceRecogComplete")
                props.onVoiceRecogComplete();
                break;
            default:
                console.log("not supported key event");
        } 
    }
    return(
        <span ref={recogReadyRef} onKeyDown={(evt)=>onKeyPress(evt)}>
            {props.label} 

            <span style={{
                "backgroundColor": "lightgray"
            }}
                >
            확인
            </span>
        </span>
    )
}

export {Confirm}