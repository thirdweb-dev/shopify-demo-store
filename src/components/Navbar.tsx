import { useCart } from "@/hooks/useCart";
import {
  Badge,
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { Signin } from "./Signin";
import { AnnouncementBanner } from "./AnnouncementBanner";

export const Navbar: React.FC = () => {
  const { data: cart, isLoading } = useCart();

  return (
    <>
      <AnnouncementBanner />
      <Container
        maxW="container.page"
        position="sticky"
        top={0}
        bg="#0E0E10"
        zIndex={1}
      >
        <Flex
          w="full"
          direction="row"
          gap={4}
          justifyContent="space-between"
          alignItems="center"
          py={7}
        >
          <Link href="/">
            <Flex gap={4} justifyContent="center" alignItems="center">
              <Image src="/store-logo.svg" alt="logo" h={10} />
              <Text>Commerce Reimagined</Text>
            </Flex>
          </Link>
          <Flex
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            gap={6}
          >
            {!isLoading && (
              <Box position="relative">
                <IconButton
                  as={Link}
                  href="/cart"
                  icon={<FiShoppingCart />}
                  aria-label="cart-btn"
                  zIndex={2}
                  size="md"
                  variant="ghost"
                />
                <Badge
                  zIndex={4}
                  position="absolute"
                  top={0}
                  right={0}
                  transform="translate(33%, -33%)"
                >
                  {cart?.lines?.edges?.reduce((acc, curr) => {
                    return acc + curr.node.quantity;
                  }, 0) || 0}
                </Badge>
              </Box>
            )}
            <Signin />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
