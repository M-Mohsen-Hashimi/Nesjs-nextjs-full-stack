import { get } from "@/app/common/util/fetch";

export default async function getProduct(productId: number) {
  return get(`products/${productId}`);
}
