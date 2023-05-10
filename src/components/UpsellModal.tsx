import { Box, Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { ConnectWallet, useUser } from "@thirdweb-dev/react";
import { FC } from "react";

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const UpsellModal: FC<UpsellModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const { user } = useUser();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#000000" >
        <ModalHeader>You&apos;re eligible for additional rewards</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!user?.address ? (
            <>
          <Text mb={4}>
            You can earn additional rewards by signing in with your email address. Are you sure you want to continue without signing in?
          </Text>
            <Flex w="full" mx="auto" alignItems="center" justifyContent="center">
              <ConnectWallet btnTitle="Sign in" />
            </Flex>
            </>
          ) : (
            <Text>
              You are now going to receive rewards for purchasing this product!
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant='outline' onClick={() => {
            onSubmit();
            onClose();
          }}>Add to cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};