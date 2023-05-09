import { removeCartLine } from "@/lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { item } = req.body;
  const cartId = req.cookies.cart;
  if (!cartId) {
    res.status(404).json({ error: "No cart found" });
    return;
  }
  try {
    const cart = await removeCartLine(item, cartId);
    res.status(200).json({ cart });
  } catch (error) {
    console.error("Cart Error", error);
    res.status(500).json({ error });
  }
}
