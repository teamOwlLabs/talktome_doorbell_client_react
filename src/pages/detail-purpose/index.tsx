import React,{ useEffect, useReducer, useRef } from "react";
import { getKeyEventValue } from "../../utils";

type DetailPurposePageProps = {
    onPressCall:Function
}
export const DetailPurposePage = (props:DetailPurposePageProps)=>{
    const keyPressEvent = (evt:React.KeyboardEvent)=>{
        switch(evt.code){
            case (getKeyEventValue("CALL")):
                props.onPressCall();
                break;  
            default:
                console.warn("no proper keyevent input.")
        }
    }
    const detailPurposeRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        detailPurposeRef.current!.focus();
        },[])
    return (
        <div ref={detailPurposeRef} tabIndex={0} onKeyDown={(evt)=>keyPressEvent(evt)}>detail purpose</div>
    )
}