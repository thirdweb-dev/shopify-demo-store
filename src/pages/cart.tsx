import { LoyaltyTokens } from "@/CommerceKit/Upsells/loyalty-tokens";
import { Quantity } from "@/components/Cart/Quantity";
import { useCart } from "@/hooks/useCart";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";

export default function CartPage() {
  const { data: cart, isLoading: cartLoading } = useCart();

  if (cartLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner />
      </Flex>
    );
  }

  const { edges: cartItems } = cart?.lines || {};

  return (
    <Flex justifyContent="center" my="auto">
      <Card w="container.sm" bg="transparent" shadow="none">
        <CardHeader textAlign="center">
          <Heading>Your cart</Heading>
        </CardHeader>
        <CardBody>
          {!cartItems || cartItems.length < 1 ? (
            <Center>
              <Text fontSize="lg" textAlign="center">
                Your cart is empty! Go select some products and come back!
              </Text>
            </Center>
          ) : (
            <Box>
                {cartItems.map(({ node }) => {
                  const {
                    id,
                    merchandise: {
                      product: {
                        title,
                        featuredImage: { altText, url },
                        tags,
                      },
                    },
                  } = node;

                  return (
                    <Flex key={id} alignItems="center" gap={4}>
                      <Image alt={altText} src={url} w="75px" alignSelf="start" />
                      <Text fontSize="xl">{title}</Text>
                      <Flex justifySelf="end" ml="auto">
                      <Quantity item={node} gated={tags.includes("gated")} />
                    </Flex>
                  </Flex>
                );
              })}
              <Button
                as="a"
                href={cart?.checkoutUrl}
                w="full"
                mt={4}
                target="_blank"
                colorScheme="purple"
              >
                Checkout
              </Button>
            </Box>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
}
