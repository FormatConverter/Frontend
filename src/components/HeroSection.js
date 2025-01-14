import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Typical from "react-typical";
import BackgroundImage from "../assets/image.png";

const MotionBox = motion(Box);

const typicalSteps = [
  "Upload your audio file",
  2000, // Increased duration
  "and convert it to the desired format",
  2000, // Increased duration
  "with ease.",
  3000, // Increased duration
];

const HeroSection = () => (
  <MotionBox
    bgImage={`url(${BackgroundImage})`}
    bgSize="cover"
    bgPos="center"
    textAlign="center"
    py="16"
    initial={{ opacity: 0, y: -30 }} 
    animate={{ opacity: 1, y: 0 }}   
    transition={{ duration: 1 }}    
  >
    <Heading fontSize="6xl" color="orange.600" mb="6">
      Convert Your Audio Files Seamlessly
    </Heading>

    <Box fontSize="3xl" color="gray.700" mb="10">
      <Typical
        steps={typicalSteps} 
        loop={Infinity} 
        wrapper="span" 
      />
    </Box>
  </MotionBox>
);

export default HeroSection;
