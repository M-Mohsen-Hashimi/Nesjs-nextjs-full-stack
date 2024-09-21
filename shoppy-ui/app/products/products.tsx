import { Grid2 as Grid } from "@mui/material";
import getProducts from "./actions/get-products";
import Product from "./product";
import ProductsGrid from "./products-grid";

export default async function Products() {
  const products = await getProducts();
  return <ProductsGrid products={products} />;
}
