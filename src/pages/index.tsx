import { Products } from "@/components/Products/Products";
import { getAllProducts } from "@/lib/shopify";
import { GraphQLProducts } from "@/types";
import { Flex, Heading } from "@chakra-ui/react";

export default function Home({ products }: { products: GraphQLProducts }) {
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

    return {
      props: {
        products: products.body.data.products,
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