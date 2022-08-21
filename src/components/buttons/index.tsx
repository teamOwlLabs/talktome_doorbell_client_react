import { useEffect, useState } from "react"
import { getKeyEventValue } from "../../utils"

type buttonProps={
    isActive:Boolean,
    onReachedTop:Function,
    onReachedBottom:Function,
    onPressArrowUp:Function,
    onPressArrowDown:Function,
    onPressSelect:Function,
    onPressCall:Function,
    onPressRecord:Function,
    label:String,
    trueButtonText:String,
    falseButtonText:String
}
const Button = (props:buttonProps)=>{
    const [status,setStatus] = useState(true);
    useEffect(()=>{
        if (props.isActive){
            window.addEventListener("keypress",(e)=>{
                console.log("KeyCode:",e.code)
                switch(e.code){
                    case getKeyEventValue("UP"):
                        if (status){
                            props.onReachedTop();
                        }
                        props.onPressArrowUp();
                        break;
                    case getKeyEventValue("DOWN"):
                        if(!status){
                            props.onReachedBottom();
                        }
                        props.onPressArrowDown();
                        break;
                    case getKeyEventValue("SELECT"):
                        props.onPressSelect();
                        break;
                    case getKeyEventValue("RECORD"):
                        props.onPressRecord();
                        break;
                    case getKeyEventValue("CALL"):
                        props.onPressCall();
                        break;
                    default:
                        console.error("wrong keycode input. check button configuration")
                }
            })
        }
    },[])
    
    return(
        <span>
            <div style={status?{
                "backgroundColor":"lightgray"
            }:undefined}>
                {props.label}
                
            </div>
            <div style={!status?{
                "backgroundColor":"lightgray"
            }:undefined}>
                {props.trueButtonText}
            </div>
        </span>
    )
}

export {Button}