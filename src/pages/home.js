import React, { useState } from "react";
import { Box, VStack, Checkbox } from "@chakra-ui/react";
import Header from "../components/Header";
import FileUploader from "../components/FileUploader";
import FormatSelector from "../components/FormatSelector";
import ConvertButton from "../components/ConvertButton";
import DownloadButton from "../components/DownloadButton";
import ErrorMessage from "../components/ErrorMessage";
import formatOptions from "../config/formatOptions";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AdvancedOptions from "../components/AdvancedOptions";

const Home = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("mp3");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState(null);

  const currentFormatOptions = formatOptions[format];
  const allowedFormats = Object.keys(formatOptions);

  // Handle file change
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
      setError(null);
    }
  };

  // Handle file conversion
  const handleConvert = async () => {
    if (!file) {
      setError("Please upload a file before converting.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("output_format", format);

      // Add advanced options
      Object.entries(selectedOptions).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      // Send conversion request
      const response = await axios.post(
        "http://localhost:5050/audio/convert_audio",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Converted file:", response.data.output_file);
      setConvertedFile(response.data.output_file); // Store converted file name
    } catch (err) {
      setError("Failed to convert the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file download
  const handleDownload = async () => {
    if (!convertedFile) {
      alert("No file available for download.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`http://127.0.0.1:5050/download/${convertedFile}`, {
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      let fileName = convertedFile;

      if (contentDisposition) {
        const filenameRegex = /filename\s*=\s*["']?([^"']+)["']?/i;
        const matches = contentDisposition.match(filenameRegex);
        if (matches && matches[1]) {
          fileName = matches[1].trim();
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 0);
    } catch (error) {
      console.error("Error during file download:", error.message);
      setError("Failed to download the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Header />
      <HeroSection />
      <Box py="16" px="8">
        <VStack spacing="6" maxW="600px" mx="auto">
          <FileUploader handleFileChange={handleFileChange} />
          <FormatSelector
            format={format}
            setFormat={setFormat}
            allowedFormats={Object.keys(formatOptions)}
          />
          <Checkbox isChecked={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} mb="6">
            Show Advanced Settings
          </Checkbox>
          {showAdvanced && currentFormatOptions && (
            <AdvancedOptions
              format={format}
              options={currentFormatOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          )}
          <ConvertButton handleConvert={handleConvert} isLoading={isLoading} format={format} />
          <ErrorMessage error={error} />
          {convertedFile && (
            <DownloadButton handleDownload={handleDownload} isLoading={isLoading} />
          )}
        </VStack>
      </Box>
      <AboutSection />
    </Box>
  );
};

export default Home;
