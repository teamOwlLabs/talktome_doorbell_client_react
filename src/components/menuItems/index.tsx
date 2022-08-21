type MenuItemProps = {
    innerText:String,
    isSelected:Boolean,
    id:number
}
export const MenuItem = (props:MenuItemProps)=>{
    return (
        <div key={props.id} style={props.isSelected?{"backgroundColor":"lightgray"}:{}}>{props.innerText}</div>
    )
}