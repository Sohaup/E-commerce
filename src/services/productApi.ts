export async function getProducts() {
   const res = await fetch("https://ecommerce.routemisr.com/api/v1/products"
      , { method: "GET", cache: "no-store" });
   const products = await res.json();
   return products?.data;
}


export async function getRelatedProductsUsingCategory(categoryId: string) {
   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      , { method: "GET", cache: "no-store" });
   const products = await res.json();
   return products?.data;
}


