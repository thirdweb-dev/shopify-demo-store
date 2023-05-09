import { Products } from "@/components/Products/Products";
import { getAllProducts } from "@/lib/shopify";
import { GraphQLProducts, Product } from "@/types";
import { Flex } from "@chakra-ui/react";

export default function Home({ products }: { products: Product[] }) {
  return (
    <Flex direction="column">
      <Products products={products} />
    </Flex>
  );
}

export async function getStaticProps() {
  try {
    const products = await getAllProducts();

    if (products.error) {
      return {
        props: {
          products: [],
        },
      };
    }

    if (!products.body.data.products) {
      return {
        props: {
          products: [],
        },
      };
    }

    const parsedProducts = products.body.data.products.edges.map((product: GraphQLProducts["edges"][number]) => ({
      ...product.node,
    }));

    return {
      props: {
        products: parsedProducts,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
      },
      revalidate: 60,
    };
  }
}