import { addCartLine, createNewCart, getCart } from "@/lib/shopify";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../auth/[...thirdweb]";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const user = await getUser(req);
    let { quantity, merchandiseId, productHandle, attributes = [] } = req.body;
    let cartId = req.cookies.cart;

    if (!cartId) {
      // first create a cart
      const cart = await createNewCart();

      cartId = cart.body.data.cartCreate.cart.id || "";
      res.setHeader("Set-Cookie", `cart=${cartId}; Path=/;`);
    }

    if (!cartId) {
      res.status(400).json({ error: "No cart found" });
      return;
    }

    if (user) {
      attributes = [...attributes, { key: "wallet", value: user.address }];
    }

    const existingCart = await getCart(cartId);
    if (!existingCart.cart) {
      const cart = await createNewCart();
      cartId = cart.body.data.cartCreate.cart.id;
      res.setHeader("Set-Cookie", `cart=${cartId}; Path=/;`);
    };

    const cart = await addCartLine(quantity, merchandiseId, attributes, cartId as string);
    res.status(200).json({ cart });
  } catch (error) {
    console.error("Cart Error", error);
    res.status(500).json({ error: "Error processing the request" });
  }
}
