import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Heading,
    Text,
    Box,
    Button,
    Select,
    Input,
    Spinner,
    Checkbox,
    VStack,
    Flex,
} from "@chakra-ui/react";

const Home = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState("mp3");
    const [bitrate, setBitrate] = useState("");
    const [sampleRate, setSampleRate] = useState("");
    const [volume, setVolume] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [convertedFile, setConvertedFile] = useState(null);
    const [error, setError] = useState(null);

    const allowedFormats = ["wav", "mp3", "flac", "aac", "ogg", "m4a", "wma", "webm", "opus", "aiff"];
    const allowedBitrates = ["64k", "128k", "192k", "256k", "320k"];
    const allowedSampleRates = ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"];
    const allowedVolumes = ["0.5", "1.0", "1.5", "2.0", "2.5", "3.0"];

    useEffect(() => {
        document.title = "Audio Converter";
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
            if (!allowedFormats.includes(fileExtension)) {
                alert("Unsupported file format. Please upload a valid audio file.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null); // Reset any previous errors
        }
    };

    const handleConvert = async () => {
        if (!file) {
            alert("Please upload a file first!");
            return;
        }
        setIsLoading(true);
        setError(null); // Reset error state

        const formData = new FormData();
        formData.append("file", file);
        formData.append("output_format", format);

        // Add advanced options if they are provided
        if (showAdvanced) {
            if (bitrate) formData.append("bitrate", bitrate);
            if (sampleRate) formData.append("sample_rate", sampleRate);
            if (volume) formData.append("volume", volume);
        }

        try {
            const response = await axios.post("http://127.0.0.1:5050/convert_audio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            setConvertedFile(response.data.output_file);
        } catch (error) {
            console.error("Error during file conversion:", error.response?.data || error.message);
            setError("File conversion failed. Please check the server or file compatibility.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!convertedFile) {
            alert("No file available for download.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.get(`http://127.0.0.1:5050/download/${convertedFile}`, {
                responseType: "blob",
                withCredentials: true,
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", convertedFile);
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 0);
        } catch (error) {
            console.error("Error during file download:", error.message);
            setError("Failed to download the file.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" py="10" px="4">
            <Heading as="h1" size="xl" mb="6">
                Audio Converter
            </Heading>
            <Text mb="6" fontSize="lg" textAlign="center">
                Upload your audio file and convert it to the desired format!
            </Text>

            <Box
                border="2px dashed gray"
                p="4"
                mb="6"
                width={["100%", "80%", "60%"]}
                textAlign="center"
                borderRadius="md"
            >
                <Text>Drag and drop your file here, or</Text>
                <Input type="file" onChange={handleFileChange} mt="4" />
            </Box>

            <Select
                placeholder="Select format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                mb="6"
                width={["100%", "60%", "40%"]}
            >
                {allowedFormats.map((fmt) => (
                    <option key={fmt} value={fmt}>
                        {fmt.toUpperCase()}
                    </option>
                ))}
            </Select>

            <Checkbox isChecked={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} mb="6">
                Show Advanced Settings
            </Checkbox>

            {showAdvanced && (
                <VStack spacing={4} mb="6" width={["100%", "60%", "40%"]}>
                    <Box>
                        <Text mb="2">Bitrate (e.g., 192k):</Text>
                        <Select
                            placeholder="Select bitrate"
                            value={bitrate}
                            onChange={(e) => setBitrate(e.target.value)}
                        >
                            {allowedBitrates.map((br) => (
                                <option key={br} value={br}>
                                    {br}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Text mb="2">Sample Rate (e.g., 44100):</Text>
                        <Select
                            placeholder="Select sample rate"
                            value={sampleRate}
                            onChange={(e) => setSampleRate(e.target.value)}
                        >
                            {allowedSampleRates.map((sr) => (
                                <option key={sr} value={sr}>
                                    {sr}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Text mb="2">Volume Multiplier:</Text>
                        <Select
                            placeholder="Select volume"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                        >
                            {allowedVolumes.map((vol) => (
                                <option key={vol} value={vol}>
                                    {vol}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </VStack>
            )}

            <Button
                onClick={handleConvert}
                colorScheme="green"
                size="lg"
                mb="6"
                px="10"
                isLoading={isLoading}
                loadingText="Converting..."
            >
                Convert to {format}
            </Button>

            {error && (
                <Text color="red.500" mb="4">
                    {error}
                </Text>
            )}

            {convertedFile && (
                <Button colorScheme="blue" size="lg" onClick={handleDownload}>
                    Download File
                </Button>
            )}
        </Flex>
    );
};

export default Home;
