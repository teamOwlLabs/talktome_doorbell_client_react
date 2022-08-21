import { useEffect, useRef } from "react"
import { getKeyEventValue } from "../../utils"

type initPageProps = {
    onPressCall:Function,
}
export const InitPage = (props:initPageProps)=>{
    const pageRef = useRef<HTMLDivElement>(null)
    const keyPressEvent = (evt:React.KeyboardEvent)=>{
        console.log(evt);
        switch(evt.key){
            case (getKeyEventValue("CALL")):
                props.onPressCall();
                break;  
            default:
                console.warn("no proper keyevent input.")
        }
    }
    useEffect(()=>{
        pageRef.current!.focus();
    })
    return(
        <div onKeyDown={(evt)=>keyPressEvent(evt)} tabIndex={0} ref={pageRef}>
            <div>호출하시려면 하단에 있는 호출 버튼을 눌러주세요.</div>
        </div>
    )
}
