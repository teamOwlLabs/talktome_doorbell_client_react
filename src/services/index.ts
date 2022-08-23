
export type MenuItemType={
    id:number,
    name:String
}

export type CallRequestType={
    type:number,
    visit_reason:String
}



class NetworkError extends Error{
    constructor(msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, NetworkError.prototype);
    }

}

export async function createMenu(param:MenuItemType){
    let response = await fetch("localhost:8000/doorbell/category",{
        method:"POST",
        body:JSON.stringify(param)
    })
    if (!response.ok){
        throw new NetworkError("메뉴 생성중 네트워크 에러가 발생하였습니다.");
    }
}

export async function getMenuList():Promise<MenuItemType[]>
{

    // let response = await fetch("localhost:8000/doorbell/category",{
    //     method:"GET"
    // })
    // return response.json()
    

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
export async function createCallRequest(param:CallRequestType){
    let response = await fetch("localhost:8000/doorbell/visit",{
        method:"POST",
        body:JSON.stringify(param)
    })
    if (!response.ok){
        throw new NetworkError("메뉴 생성중 네트워크 에러가 발생하였습니다.");
    }
}

