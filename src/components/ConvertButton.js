import React from "react";
import { Button } from "@chakra-ui/react";

const ConvertButton = ({ handleConvert, isLoading, format }) => (
  <Button
    colorScheme="orange"
    size="lg"
    onClick={handleConvert}
    isLoading={isLoading}
  >
    Convert to {format.toUpperCase()}
  </Button>
);

export default ConvertButton;
