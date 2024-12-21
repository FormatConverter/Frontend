import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Typical from "react-typical";
import BackgroundImage from "../assets/image2.png";

// MotionBox 정의
const MotionBox = motion(Box);

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
 
    <Box as="h1" size="2xl" mb="6" color="orange.600" fontSize="3xl">
      <Typical
        steps={[
          "Convert Your Audio Files Seamlessly", 
          2000,                                 
        ]}
        loop={1} 
        wrapper="span" 
      />
    </Box>

    <Box fontSize="lg" color="gray.700" mb="8">
      <Typical
        steps={[
          "Upload your audio file",         
          1000,                           
          "and convert it to the desired format", 
          1000,                            
          "with ease.",                   
          2000,                             
        ]}
        loop={1} 
        wrapper="span" 
      />
    </Box>
  </MotionBox>
);

export default HeroSection;
