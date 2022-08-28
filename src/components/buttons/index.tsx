import { useEffect, useRef, useState } from "react"
import { getKeyEventValue } from "../../utils"

type buttonProps={
    value:Boolean, 
    label:String,
    trueButtonText:String,
    falseButtonText:String,
    updateValue:Function,
    sendValueSelected:Function,
    onRecordButtonPressed:Function

}
const Button = (props:buttonProps)=>{
    const buttonRef =useRef<HTMLSpanElement>(null);
    useEffect(()=>{
        console.log("focusing on button")
        buttonRef.current?.focus();
    },[])

    const keyPressDownEvent = (evt:React.KeyboardEvent)=>{
        console.log("keyPressDownEvent:",evt.key)
        switch(evt.key){
            case (getKeyEventValue("CALL")):
               //props.onPressCall();
                break;  
            case (getKeyEventValue("RECORD")):
                props.onRecordButtonPressed(); 
                break;
            case (getKeyEventValue("UP")):
                if(props.value===false){
                    props.updateValue(true)
                }         
                console.log("voice recog up pressed")
                break;
            case (getKeyEventValue("DOWN")):
                if (props.value===true){
                    props.updateValue(false)
                }                    
                console.log("voicerecog down pressed")

                break;
            case (getKeyEventValue("SELECT")):
                    props.sendValueSelected();
                break;
            default:
                console.warn("no proper keyevent input.")
                return null;
        }
    }
    
    return(
        <span ref={buttonRef} onKeyDown={(evt)=>keyPressDownEvent(evt)} tabIndex={0}  >
            {props.label} 

            <div style={props.value ? {
                "backgroundColor": "lightgray"
            } : undefined}
                >
            {props.trueButtonText}

            </div>
            <div style={!props.value ? {
                "backgroundColor": "lightgray"
            } : undefined}>
                {props.falseButtonText}
            </div>
        </span>
    )
}

export {Button}