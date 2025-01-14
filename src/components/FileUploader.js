import React from "react";
import { Box, Text, Input } from "@chakra-ui/react";

const FileUploader = ({ handleFileChange }) => (
  <Box
    border="2px dashed gray"
    p="4"
    width="100%"
    textAlign="center"
    borderRadius="md"
  >
    <Text>Drag and drop your file here, or</Text>
    <Input type="file" onChange={handleFileChange} mt="4" />
  </Box>
);

export default FileUploader;
