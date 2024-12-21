import React from "react";
import { VStack, Box, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

const AdvancedOptions = ({ options, selectedOptions, setSelectedOptions }) => {
  if (!options) return null;

  const handleChange = (key, value) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <VStack spacing={4} mb="6" width={["100%", "60%", "40%"]}>
      {/* Codec */}
      <Box>
        <Select
          placeholder="Select codec"
          value={selectedOptions.codec || ""}
          onChange={(e) => handleChange("codec", e.target.value)}
        >
          {options.codec.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Box>

      {/* Bitrate */}
      <Box>
        <Select
          placeholder="Select bitrate"
          value={selectedOptions.bitrate || ""}
          onChange={(e) => handleChange("bitrate", e.target.value)}
        >
          {options.bitrate.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
      </Box>

      {/* Sample Rate */}
      <Box>
        <Select
          placeholder="Select sample rate"
          value={selectedOptions.sampleRate || ""}
          onChange={(e) => handleChange("sampleRate", e.target.value)}
        >
          {options.sampleRate.map((sr) => (
            <option key={sr} value={sr}>
              {sr}
            </option>
          ))}
        </Select>
      </Box>

      {/* Volume */}
      <Box>
        <Slider
          defaultValue={1}
          min={options.volume.min}
          max={options.volume.max}
          step={0.1}
          value={selectedOptions.volume || 1}
          onChange={(value) => handleChange("volume", value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </VStack>
  );
};

export default AdvancedOptions;
