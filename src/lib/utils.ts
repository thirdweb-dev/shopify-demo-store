interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
}

interface ShopifyFetchResult {
  status: number;
  body?: any;
  error?: string;
}

async function fetchFromShopify(
  { query, variables }: ShopifyFetchParams,
  endpoint: string,
  headers: Record<string, string>,
): Promise<ShopifyFetchResult> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();

    return {
      status: response.status,
      body: data,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}

export async function shopifyFetch(params: ShopifyFetchParams) {
  const endpoint = process.env.SHOPIFY_STOREFRONT_API_URL as string;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

  return fetchFromShopify(params, endpoint, {
    "Shopify-Storefront-Private-Token": key,
  });
}

export async function shopifyFetchAdminAPI(params: ShopifyFetchParams) {
  const endpoint = process.env.SHOPIFY_ADMIN_API_URL as string;
  const key = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN as string;

  return fetchFromShopify(params, endpoint, {
    "X-Shopify-Access-Token": key,
  });
}
