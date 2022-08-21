import { useEffect } from "react"

const TIMEOUT_VALUE = 5000;
type CallingStatusPageProps = {
    onTimeOut:Function
}
export const CallingStatusPage = (props:CallingStatusPageProps)=>{
    useEffect(()=>{
        setTimeout(()=>{props.onTimeOut()},TIMEOUT_VALUE)
    },[])
    return (
        <div>calling status page</div>
    )
}