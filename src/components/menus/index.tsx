import React, { useEffect, useRef, useState } from "react";
import { getMenuList, MenuItemType } from "../../services";
import { getKeyEventValue } from "../../utils";
import { MenuItem } from "../menuItems";

type MenuProps = {
    setSelected:Function,
    onPressUp:Function,
    onPressDown:Function,
    onPressSelect:Function,

}
export const Menu = (props:MenuProps)=>{
    const [menuList,setMenuList] = useState<MenuItemType[]>([]);
    const [selectedMenu,setSelectedMenuItem] = useState<MenuItemType>({id:0,name:""})
    const menuRef = useRef<HTMLDivElement>(null);
    function isStartReached(){
        console.log("isStartReached")
        return(selectedMenu.id===menuList[0].id)
    }

    function isEndReached(){
        console.log("isEndReached",menuList,selectedMenu)
        return (selectedMenu.id===menuList[menuList.length-1].id)
    }

    function getCurrentMenuIndex(){
        console.log("getCurrentMenuIntex")
        return menuList.findIndex((menuItem)=>menuItem.id===selectedMenu.id)
    }

    const keyPressEvent = (evt:React.KeyboardEvent)=>{
        console.log(evt.key)
        switch(evt.key){
            case getKeyEventValue("UP"):
                console.log("onKeyUp")
                console.log("menuList:",menuList)
                if (isStartReached()){
                    return;
                }
                setSelectedMenuItem(menuList[getCurrentMenuIndex()-1])
                // props.onPressUp();
                break;
            case getKeyEventValue("DOWN"):
                if(isEndReached()){
                    return;
                }
                setSelectedMenuItem(menuList[getCurrentMenuIndex()+1])
                // props.onPressDown();
                break;
            case getKeyEventValue("SELECT"):
                props.onPressSelect(selectedMenu);
                break;
            default:
                console.warn("no proper keyevent input.")
        }
    }
    
    useEffect(()=>{
        
        console.log("useEffect ")
        getMenuList().then((result)=>{
            console.log("got menulist result")
            setMenuList(result);
            console.log(result)
            setSelectedMenuItem(result[0])

            menuRef.current!.focus();

            // window.addEventListener("keypress",keyPressEvent)
        })
        
    
        // return window.removeEventListener("keypress",keyPressEvent)
    },[]);
    
        return (
            <div onKeyDown={keyPressEvent} tabIndex={0} ref={menuRef} >
                {menuList.map((item,index,arr)=>{
                    return (<MenuItem key={item.id} id={item.id} innerText={item.name} isSelected = {item.id===selectedMenu.id}></MenuItem>)
                })}
            </div>
        )
    
    
}