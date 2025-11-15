import returnToken from "@/utilities/token";

export async function addProductToTheCart({productId , token}:{productId:string , token:string | undefined}) {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
        method:"POST" ,
        body:JSON.stringify({productId}) ,
        headers: {
            token : typeof token == "string" ? token : ""  ,
            'content-type':'application/json' 
        }
      });
      return await response.json();  
}

export async function getAllCartProducts({token}:{token:string | undefined}) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
        headers:{
            token: typeof token == "string" ? token : "" ,
        }
    });    
    return await response.json();
}

export async function deleteProductFromCart({productId}:{productId:string}) {
    const myToken = await returnToken();    
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
        method:"DELETE" ,
        headers:{
            token:`${myToken?.token}`
        } 
    }); 
    
    const resJson = await response.json(); 
    console.log(resJson)
    return resJson;

}