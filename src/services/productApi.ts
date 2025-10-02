export async function getProducts() {
      const res  = await fetch("https://ecommerce.routemisr.com/api/v1/products" 
        , {method:"GET" , cache:"no-store"  }  );
     const products = await res.json();
     return products?.data ;    
  }


  export async function getCategories() {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      method: "GET",
      cache: "no-store"
    })
    const categories = await res.json();
    return categories.data;
  }