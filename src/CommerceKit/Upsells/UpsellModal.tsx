import { Box, Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useUser } from "@thirdweb-dev/react";
import { FC } from "react";
import { Signin } from "../../components/Signin";
import Image from "next/image";

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const UpsellModal: FC<UpsellModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const { user } = useUser();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent bg="#000000" p={8}>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" justifyContent="center" alignItems="center" gap={4}>
            <Box my={4}>
              <Image src="/sparkle.svg" alt="sparkle" width="71" height="71" />
            </Box>
            <Text textAlign="center" fontSize="2xl" fontWeight="bold">You&apos;re eligible for additional rewards</Text>
            {!user?.address ? (
              <>
                <Text fontSize="2xl" textAlign="center" color="#ECECECB2">
                  You can earn additional rewards by signing in with your email address. Are you sure you want to continue without signing in?
                </Text>
              </>
            ) : (
              <Text>
                You are now going to receive rewards for purchasing this product!
              </Text>
            )}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex w="full" justifyContent="center" alignItems="center" gap={4}>
            <Signin w="182px" />
            <Button w="182px" variant='outline' onClick={() => {
              onSubmit();
              onClose();
            }}>Add to cart</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};