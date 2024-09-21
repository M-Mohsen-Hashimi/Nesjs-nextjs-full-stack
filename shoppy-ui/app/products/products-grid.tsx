"use client"
import { Grid2 as Grid } from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../common/constants/api";
import getAuthentication from "../[auth]/actions/get-authentication";
import revalidateProducts from "./revalidate-products";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;
    const createSocket =  async() => {
       socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });
  
      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    }

    createSocket()
    return () => {
      socket?.disconnect()
    }
  }, []);
  return (
    <Grid container spacing={3} sx={{ height: "85vh", overflowY: "scroll" }}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
