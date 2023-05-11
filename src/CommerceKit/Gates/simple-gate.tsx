import { Signin } from "@/components/Signin";
import { ComponentWithChildren } from "@/utils";
import {
  Box,
  Card,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  useUser,
} from "@thirdweb-dev/react";

interface SimpleTokenGateProps {
  gateContractAddress: string;
}

export const SimpleTokenGate: ComponentWithChildren<SimpleTokenGateProps> = ({
  children,
  gateContractAddress,
}) => {
  const address = useAddress();
  const { isLoggedIn } = useUser();

  const { contract, isLoading: contractLoading } =
    useContract(gateContractAddress);

  const { data, isLoading: ownedNFTsLoading } = useOwnedNFTs(contract, address);

  const isLoading = contractLoading || ownedNFTsLoading;

  const ownsToken = data?.length && data.length > 0;

  if (ownsToken) {
    return <>{children}</>;
  }

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Text fontWeight="700">
            {!address ? "Please sign in with email to get started." : "Please sign in."}
          </Text>
          <Signin />
        </>
      );
    } else {
      if (isLoading) {
        return <Spinner alignSelf="center" textAlign="center" />;
      } else if (!ownsToken) {
        return <Text>You do not have VIP Membership to gain access to this product</Text>;
      }
    }
  };

  return (
    <Box position="relative" w="100%">
      <Box pointerEvents="none">{children}</Box>
      <SimpleGrid
        p={8}
        borderRadius="2xl"
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        left={0}
        backdropFilter="blur(8px)"
        bg="rgba(0, 0, 0, 0.5)"
        columns={1}
        placeItems="center"
      >
        <Flex direction="column" gap={3}>
          <Card bg="rgba(0,0,0,1)" p={8} textAlign="center">
            <Flex direction="column" gap={4}>
              <Heading fontSize="32px">VIP Members Exclusive</Heading>
              <Flex direction="column" gap={8}>{renderContent()}</Flex>
            </Flex>
          </Card>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};