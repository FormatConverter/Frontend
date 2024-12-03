import React from "react";
import { Button } from "@chakra-ui/react";

const ColorButton = ({ colorScheme = "black", children, variant, ...props }) => {
    return variant ? (
        <Button
            variant={variant}
            borderWidth={variant === "outline" ? "2px" : null}
            colorScheme={colorScheme}
            color="blackAlpha.900" 
            {...props}
        >
            {children}
        </Button>
    ) : (
        <Button
            backgroundColor="black" 
            color="whiteAlpha.900"  
            _hover={{ bg: "gray.800" }} 
            {...props}
        >
            {children}
        </Button>
    );
};

export default ColorButton;
