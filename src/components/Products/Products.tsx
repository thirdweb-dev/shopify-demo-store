import type { GraphQLProducts } from "@/types";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";

interface ProductsProps {
  products: GraphQLProducts;
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
  if (!products.edges.length) {
    return (
      <Flex w="full" direction="column" justifyContent="center" alignItems="center" gap={4}>
        <Heading>No products yet!</Heading>
        <Text>
          You don&apos;t have any products yet! Go and create some from the
          Shopify Admin Dashboard
        </Text>
      </Flex>
    );
  }

  const mappedProducts = products.edges.map((product) => ({
    ...product,
  }));

  return (
    <SimpleGrid minChildWidth="300px" spacing={20} mb={24}>
      {mappedProducts.map((product) => (
        <ProductCard key={product.node.id} product={product.node} />
      ))}
    </SimpleGrid>
  );
};

export default Products;
