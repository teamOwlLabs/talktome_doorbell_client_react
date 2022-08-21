import { useEffect } from "react";
import { Menu } from "../../components/menus";
import { MenuItemType } from "../../services";

type SelectPurposePageProps = {
    onPressSelect:Function
}
export const SelectPurposePage = (props:SelectPurposePageProps)=>{
    
    return (
        <div><Menu setSelected={(value: any) => {
            console.log(value);
        } } 
        onPressUp={()=>{}} 
        onPressDown={()=>{}} 
        onPressSelect={(value: MenuItemType)=>{console.log(value.id,value.name);props.onPressSelect(value.id)}} 
        /></div>
    )
}