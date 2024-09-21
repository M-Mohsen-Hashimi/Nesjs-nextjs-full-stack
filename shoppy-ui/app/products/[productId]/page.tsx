import { Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../product-image";
import Grid from "@mui/material/Grid2";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps {
  params: { productId: string };
}
export default async function SingleProduct({ params }: SingleProductProps) {
  const product = await getProduct(+params.productId);
  return (
    <Grid container marginBottom={"2rem"} spacing={4}>
      {product.imageExists && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Image
            width={0}
            height={0}
            src={getProductImage(product.id)}
            alt="Product Image"
            sizes="100vw"
            className="w-auto md:w-1/2 h-auto"
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">{product.price}</Typography>
          <Checkout productId={product.id} />
        </Stack>
      </Grid>
    </Grid>
  );
}
