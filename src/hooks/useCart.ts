import { GraphQLCart } from "@/types";
import useSWR, { SWRResponse } from "swr";

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export function useCart(): SWRResponse<GraphQLCart & { error: string }> {
  return useSWR(`/api/cart`, fetcher);
}