import React from "react";
import { Text } from "@chakra-ui/react";

const ErrorMessage = ({ error }) =>
  error ? <Text color="red.500">{error}</Text> : null;

export default ErrorMessage;
