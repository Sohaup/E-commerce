export async function getBrands() {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands" , {
       method:"GET" ,
       cache:"no-store"
    });
    const brands =  await res.json();
   
    return brands.data;
}