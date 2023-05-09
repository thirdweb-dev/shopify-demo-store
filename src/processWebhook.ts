import { SDKOptions, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { APP_NETWORK, NFT_RECEIPTS_ADDRESS, RELAYER_URL } from "./lib/environment-variables";
import { shopifyFetchAdminAPI } from "./lib/utils";
import { GET_ORDER_BY_ID_QUERY } from "./queries";

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

export const processWebhook = async (shopifyOrderId: string) => {
  try {
    const response = await shopifyFetchAdminAPI({
      query: GET_ORDER_BY_ID_QUERY,
      variables: {
        id: `gid://shopify/Order/${shopifyOrderId}`,
      },
    });

    const respBody = response.body as ResponseBody;

    if (!respBody.data.order.lineItems) {
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
      return nftCollection.erc721.mintTo(wallet, {
        ...metadata,
        attributes: {
          trait_type: "Amount",
          value: item.quantity,
        },
      });
    });

    // Await all promises to resolve
    await Promise.all(mintPromises);

    console.timeLog("mintReceipt")
  } catch (error) {
    console.error("Error:", error);
  }
};