import { QuantityProps } from "@/components/Cart/Quantity";
import {
  ADD_CART_LINE_MUTATION,
  CREATE_CART_MUTATION,
  CREATE_CHECKOUT_MUTATION,
  DELETE_LINE_FROM_CART_MUTATION,
  EDIT_CART_LINE_MUTATION,
  GET_CART_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_QUERY,
} from "@/queries";
import { Product } from "@/types";
import { shopifyFetch } from "./utils";

export const isGatedProduct = (product: Product) =>
  product.tags.includes("gated");

export const getProductByHandle = async (productHandle: string) => {
  const product = await shopifyFetch({
    query: PRODUCT_QUERY,
    variables: { handle: productHandle },
  });
  return product.body.data.productByHandle as Product;
};

export const createNewCart = async () => {
  const newCart = await shopifyFetch({
    query: CREATE_CART_MUTATION,
    variables: {},
  });

  return newCart;
};

export const getCart = async (cartId: string) => {
  if (!cartId) throw new Error("Cart ID is required");

  const cart = await shopifyFetch({
    query: GET_CART_QUERY,
    variables: {
      cartId,
    },
  });

  return {
    cart: cart.body.data.cart,
  };
};

export const updateCartLine = async (
  item: QuantityProps["item"],
  value: number,
  cartId: string,
) => {
  if (!cartId) throw new Error("Cart ID is required");

  const cart = await shopifyFetch({
    query: EDIT_CART_LINE_MUTATION,
    variables: {
      cartId,
      lines: [
        {
          id: item.id,
          quantity: value,
        },
      ],
    },
  });

  return {
    cart: cart.body.data,
  };
};

export const removeCartLine = async (
  item: QuantityProps["item"],
  cartId: string,
) => {
  if (!cartId) throw new Error("Cart ID is required");

  const cart = await shopifyFetch({
    query: DELETE_LINE_FROM_CART_MUTATION,
    variables: {
      cartId,
      lineIds: [item.id],
    },
  });

  return {
    cart: cart.body.data,
  };
};

export const addCartLine = async (
  quantity: number,
  merchandiseId: string,
  attributes: {
    key: string;
    value: string;
  }[],
  cartId: string,
) => {
  if (!cartId) throw new Error("Cart ID is required");

  const cart = await shopifyFetch({
    query: ADD_CART_LINE_MUTATION,
    variables: {
      cartId,
      lines: {
        quantity,
        merchandiseId,
        attributes,
      },
    },
  });

  return {
    cart: cart.body.data.cartLinesAdd.cart,
  };
};

export const createCheckoutUrl = async (
  quantity: number,
  variantId: string,
  attributes: {
    key: string;
    value: string;
  }[],
) => {
  const data = await shopifyFetch({
    query: CREATE_CHECKOUT_MUTATION,
    variables: {
      input: {
        lineItems: [
          {
            quantity,
            variantId,
            customAttributes: attributes,
          },
        ],
      },
    },
  });

  return { checkout: data.body.data.checkoutCreate.checkout };
};

export const getAllProducts = async () => {
  const products = await shopifyFetch({
    query: PRODUCTS_QUERY,
    variables: {},
  });

  return products;
};
