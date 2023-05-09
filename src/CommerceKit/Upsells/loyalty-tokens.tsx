import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ConnectWallet, useAddress, useUser } from "@thirdweb-dev/react";

export const LoyaltyTokens: React.FC = () => {
  const { isLoggedIn } = useUser();
  const address = useAddress();

  const renderContent = () => {
    if (isLoggedIn) {
      return {
        title: "You are earning digital rewards!",
        description:
          "We reward loyal customers with digital rewards. Collect more digital rewards to move up your membership level. Depending on your membership level, you can unlock access to more exclusive merchandise in our store.",
      };
    }
    return {
      title: "Earn rewards with every purchase!",
      description: `${address ? "Sign in" : "Connect a wallet"} to receive digital coupons and rewards with every purchase.`,
    };
  };

  const { title, description } = renderContent();

  return (
    <Flex
      my={4}
      p={4}
      direction="column"
      gap={2}
      border="1px solid rgba(255,255,255,.1)"
      borderRadius="lg"
    >
      <Heading size="sm">{title}</Heading>
      <Text>{description}</Text>
      {!isLoggedIn && (
        <Box mt={4}>
          <ConnectWallet btnTitle="Sign in" />
        </Box>
      )}
    </Flex>
  );
};