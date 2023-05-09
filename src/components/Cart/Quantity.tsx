import {
  Button,
  Flex,
  IconButton,
  Input,
  useNumberInput,
  useToast,
} from "@chakra-ui/react";
import { FC } from "react";
import { FiTrash } from "react-icons/fi";
import { mutate } from "swr";

export interface QuantityProps {
  item: {
    id: string;
    quantity: number;
  };
  gated?: boolean;
}

export const Quantity: FC<QuantityProps> = ({ item, gated }) => {
  const toast = useToast();

  const handleUpdate = async (value: number) => {
    try {
      await fetch("/api/cart/updateLine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, value }),
      });
      await mutate("/api/cart");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async () => {
    try {
      await fetch(`/api/cart/removeLine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      });
      await mutate("/api/cart");
      toast({
        title: "Item removed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: item.quantity,
      min: 1,
      max: gated ? 1 : 10,
      onChange: async (value) => {
        await handleUpdate(Number(value));
      },
      isDisabled: gated,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex alignItems="center" gap={4}>
      <Flex maxW="150px">
        <Button roundedRight="none" {...dec}>
          -
        </Button>
        <Input textAlign="center" rounded="none" {...input} />
        <Button roundedLeft="none" {...inc}>
          +
        </Button>
      </Flex>
      <IconButton
        icon={<FiTrash />}
        aria-label="Remove"
        bg="transparent"
        onClick={handleRemove}
      />
    </Flex>
  );
};