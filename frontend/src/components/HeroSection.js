import React from "react";
import { Box, Heading } from "@chakra-ui/react";

import { motion } from "framer-motion";
import Typical from "react-typical";
import BackgroundImage from "../assets/image.png";

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
    <Heading size="lg" color="orange.600">
      Convert Your Audio Files Seamlessly
    </Heading>


    <Box fontSize="10xl" color="gray.700" mb="10" >
      <Typical
        steps={[
          "Upload your audio file",         
          1000,                           
          "and convert it to the desired format", 
          1000,                            
          "with ease.",                   
          2000,                             
        ]}
        loop={Infinity} 
        wrapper="span" 
      />
    </Box>
  </MotionBox>
);

export default HeroSection;
