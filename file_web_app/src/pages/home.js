import React, { useState, useEffect } from "react";
import { Heading, Text, Stack, Box, Button, Select, Input, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Main from "../components/Main";

const Home = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState("PDF");
    const [isLoading, setIsLoading] = useState(false);
    const [convertedFile, setConvertedFile] = useState(null);

    const buttonStyles = { px: 8, flex: 1, mt: 8, colorScheme: "red" };

    useEffect(() => {
        document.title = "File Converter";
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const allowedFormats = ["pdf", "html"];
        
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (!allowedFormats.includes(fileExtension)) {
                alert("Only PDF and HTML files are allowed.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleFormatChange = (event) => {
        setFormat(event.target.value);
    };

    const handleConvert = () => {
        if (!file) {
            alert("Please upload a file first!");
            return;
        }
        setIsLoading(true);

        setTimeout(() => {
            setConvertedFile({ name: `${file.name.split(".")[0]}.${format.toLowerCase()}` });
            setIsLoading(false);
        }, 2000); 
    };

    return (
        <Main>
            <Heading as="h1" size="3xl" mb="4">
                File Converter
            </Heading>
            <Text mb="4">Convert your files into different formats easily!</Text>
            
            <Box border="2px dashed gray" p="4" mb="4" width="full" textAlign="center" borderRadius="md">
                <Text>Drag and drop your file here, or</Text>
                <Input type="file" onChange={handleFileChange} mt="2" textAlign="center" />
            </Box>
            
            <Select placeholder="Select format" value={format} onChange={handleFormatChange} mb="4" width="full">
                <option value="PDF">PDF</option>
                <option value="HTML">HTML</option>
            </Select>
            
            <Button onClick={handleConvert} {...buttonStyles} disabled={isLoading}>
                {isLoading ? <Spinner size="sm" /> : `Convert to ${format}`}
            </Button>

        
            {convertedFile && (
                <Box mt="4">
                    <Text fontSize="sm">Download your converted file below:</Text>
                    <Button colorScheme="green" as={Link} to={`/download/${convertedFile.name}`} mt="2">
                        Download {convertedFile.name}
                    </Button>
                </Box>
            )}
        </Main>
    );
};

export default Home;
