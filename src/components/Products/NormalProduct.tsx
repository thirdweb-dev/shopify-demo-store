import { ProductProps } from "@/pages/products/[handle]";
import { Button, ButtonGroup, ButtonProps, Flex, Input, InputProps, NumberInputProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface NormalProductProps {
  product: ProductProps["product"];
  selectedSize: {
    id: string;
    title: string;
  };
  setSelectedSize: Dispatch<
    SetStateAction<{
      id: string;
      title: string;
    }>
  >;
  handleAddToCart: () => Promise<void>;
  incrementProps: ButtonProps;
  decrementProps: ButtonProps;
  inputProps: InputProps;
}

export const NormalProduct: React.FC<NormalProductProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  handleAddToCart,
  incrementProps,
  decrementProps,
  inputProps,
}) => {
  const variants = product.variants.edges;

  return (
    <Flex direction="column" gap={4} mt={8}>
      {variants.length > 1 && (
        <ButtonGroup size="sm" variant="outline" mt={4}>
          {product.variants.edges.map((variant) => (
            <Button
              key={variant.node.id}
              onClick={() => setSelectedSize(variant.node)}
              isActive={selectedSize.id === variant.node.id}
            >
              {variant.node.title}
            </Button>
          ))}
        </ButtonGroup>
      )}
      <Flex maxW="150px">
        <Button roundedRight="none" {...decrementProps}>
          -
        </Button>
        <Input textAlign="center" rounded="none" {...inputProps} />
        <Button roundedLeft="none" {...incrementProps}>
          +
        </Button>
      </Flex>
      <Button colorScheme="purple" onClick={handleAddToCart}>
        Add to cart
      </Button>
    </Flex>
  );
};
