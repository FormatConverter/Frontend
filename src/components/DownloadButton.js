import React from "react";
import { Button } from "@chakra-ui/react";

const DownloadButton = ({ handleDownload, isLoading }) => (
  <Button
    colorScheme="blue"
    size="lg"
    mt="4"
    onClick={handleDownload}
    isLoading={isLoading}
  >
    Download File
  </Button>
);

export default DownloadButton;
