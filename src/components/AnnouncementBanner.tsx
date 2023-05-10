import React from "react";
import { Box, Container, Flex, Icon, IconButton, Heading } from "@chakra-ui/react";
import { FiArrowRight, FiX } from "react-icons/fi";

export const AnnouncementBanner = () => {
  return (
    <Box
      position="sticky"
      zIndex="10"
      py={3}
      bgImage="linear-gradient(145.96deg, rgba(205, 0, 238, 1) 5.07%, #1652F0 100%)"
    >
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="center"
        gap={{ base: 1, md: 2 }}
        px={4}
      >
      <Box display={{ base: "none", md: "block" }} />
        <Container maxW="container.page" display="flex" px={0}>
          <Flex
            mx="auto"
            cursor="default"
            align="center"
            gap={{ base: 0.5, md: 2 }}
            color="white"
          >
            <Heading
              size="label.lg"
              as="p"
              lineHeight={{ base: 1.5, md: undefined }}
              color="white"
              fontWeight={500}
            >
              <strong>Flash promotion:</strong> we’re rewarding our most loyal customers! VIP Members Wristband holders get access to exclusive merch for the next 24 hours
            </Heading>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};
