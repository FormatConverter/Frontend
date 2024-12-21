import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const AboutSection = () => (
  <Box bg="orange.100" py="16" px="8">
    <Heading as="h2" size="xl" mb="4" textAlign="center" color="orange.600">
      Why Choose Our Converter?
    </Heading>
    <Text fontSize="lg" color="gray.700" maxW="800px" mx="auto" textAlign="center">
      Our audio converter is fast, reliable, and supports a variety of formats. Whether you
      need to adjust the quality, change the file format, or apply advanced settings, we've
      got you covered.
    </Text>
  </Box>
);

export default AboutSection;
