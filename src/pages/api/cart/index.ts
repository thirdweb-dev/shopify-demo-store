import { getCart } from "@/lib/shopify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const cartId = req.cookies.cart;
      if (!cartId) {
        res.status(404).json({ error: "No cart found" });
        return;
      }
      try {
        const cart = await getCart(cartId);
        res.status(200).json({
          ...cart.cart,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
      break;

    default:
      res.setHeader("Allow", "GET");
      res.status(405).json({ error: "Method not allowed" });
  }
}