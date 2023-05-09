import { Product } from "@/types";
import {
  AspectRatio,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiLock } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, description, handle } = product;

  const isGated = product.tags.includes("gated");
  const src = product.images.edges[0].node.originalSrc;
  const alt = product.images.edges[0].node.altText;

  return (
    <Card
      as={LinkBox}
      key={id}
      bg="transparent"
      h="full"
      shadow="none"
      borderWidth={1}
      borderColor="transparent"
      _hover={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      position="relative"
      maxW="300px"
    >
      {isGated && (
        <Tag
          variant="subtle"
          colorScheme="purple"
          position="absolute"
          top={0}
          right={0}
        >
          <Icon as={FiLock} mr={1.5} /> Members Exclusive
        </Tag>
      )}
      <CardBody>
        <AspectRatio ratio={1} >
          <Image objectFit="contain" src={src} alt={alt} borderRadius="lg" />
        </AspectRatio>
        <Flex direction="column" gap={2} mt={4}>
          <Flex align="center" justify="space-between">
            <LinkOverlay as={Link} href={`/products/${handle}`}>
              <Heading size="md">{title}</Heading>
            </LinkOverlay>
          </Flex>
          <Text noOfLines={3}>{description}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
