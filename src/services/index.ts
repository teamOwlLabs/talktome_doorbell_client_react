import { ListFormat } from "typescript"

export type MenuItemType={
    id:number,
    name:String
}

export async function getMenuList():Promise<MenuItemType[]>
{
    // fetch()
    return new Promise((resolve,reject)=>{resolve([
        {
            id:0,
            name:"지인"
        },
        {
            id:1,
            name:"배달"
        },
        {
            id:2,
            name:"택배"
        }
    ])})
}
export function createCallRequest(){

}