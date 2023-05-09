import type { NextApiRequest, NextApiResponse } from "next";
import { SDKOptions, SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import crypto from "crypto";
import { shopifyFetchAdminAPI } from "@/lib/utils";
import { GET_ORDER_BY_ID_QUERY } from "@/queries";
import { Readable } from "stream";
import {
  APP_NETWORK,
  NFT_RECEIPTS_ADDRESS,
  RELAYER_URL,
} from "@/lib/environment-variables";
import { CallOverrides } from "ethers";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

interface Data {}

type PurchasedItems = {
    id: string;
    quantity: number;
    variant: {
        id: string;
        price: {
            amount: number;
        };
        product: {
            id: string;
            title: string;
            description: string;
            featuredImage: {
                id: string;
                url: string;
            };
        };
    };
    customAttributes: {
      key: string;
      value: string;
    }[];
}[]

type ResponseBody = {
  data: {
    order: {
      id: string;
      tags: string[];
      lineItems: {
        edges: {
          node: {
            id: string;
            quantity: number;
            variant: {
              id: string;
              price: {
                amount: number;
              };
              product: {
                id: string;
                title: string;
                description: string;
                featuredImage: {
                  id: string;
                  url: string;
                };
              }
            };
            customAttributes: {
              key: string;
              value: string;
            }[];
          };
        }[];
      };
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    console.time("beforeMint")
    const secretKey = process.env.SHOPIFY_WEBHOOK_KEY as string;

    const hmac = req.headers["x-shopify-hmac-sha256"];
    const body = await getRawBody(req);
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(body)
      .digest("base64");

    // Compare our hash to Shopify's hash
    if (hash === hmac) {
      const shopifyOrderId = req.headers["x-shopify-order-id"];

      const response = await shopifyFetchAdminAPI({
        query: GET_ORDER_BY_ID_QUERY,
        variables: {
          id: `gid://shopify/Order/${shopifyOrderId}`,
        },
      });

      const respBody = response.body as ResponseBody;

      if (!respBody.data.order.lineItems) {
        res.status(500).send("Order did not contain any line items");
        return;
      }

      const itemsPurchased = respBody.data.order.lineItems.edges.map(
        (edge) => edge.node,
      );

      let wallet = "";
      try {
        wallet =
          itemsPurchased[0].customAttributes.find(
            (e: any) => e.key === "wallet",
          )?.value || "";
      } catch (e) {
        console.log("error getting wallet address", e);
      }

      const sdkOptions: SDKOptions | undefined = RELAYER_URL
        ? {
            gasless: {
              openzeppelin: { relayerUrl: RELAYER_URL },
            },
          }
        : undefined;

      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.GENERATED_PRIVATE_KEY as string,
        APP_NETWORK,
        sdkOptions,
      );

      const nftCollection = await sdk.getContract(NFT_RECEIPTS_ADDRESS);

      console.timeLog("beforeMint")
      console.time("prepare")
      // For each item purchased, mint the wallet address an NFT
      const mintPromises = itemsPurchased.map(async (item) => {
        // Grab the information of the product ordered
        const product = item.variant.product;

        // Set the metadata for the NFT to the product information
        const metadata = {
          name: product.title,
          description: product.description,
          image: product.featuredImage.url,
        };

        // Mint NFT without awaiting here
        const preparedTx = nftCollection.erc721.mintTo.prepare(wallet, {
          ...metadata,
          attributes: {
            trait_type: "Amount",
            value: item.quantity,
          },
        });


        return preparedTx;
      });

      console.timeLog("prepare")

      console.time("minting")
      // Await all promises to resolve
      await Promise.all(mintPromises)
        .then((txs) => Promise.all(txs.map(async (tx) => tx.queue())))
        .catch((err) => {
        console.error("Error in minting process:", err);
      });
      console.timeLog("minting")

      res.status(200).send("OK");
    } else {
      res.status(403).send("Forbidden");
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Something went wrong");
    return;
  }
}