import React from "react";
import {
  VStack,
  Box,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

const AdvancedOptions = ({ options, selectedOptions, setSelectedOptions }) => {
  if (!options) return null;

  const handleChange = (key, value) => {
    // 값이 빈 값이면 해당 키를 삭제하고, 그렇지 않으면 추가
    setSelectedOptions((prev) => {
      if (!value && value !== 0) {
        const updatedOptions = { ...prev };
        delete updatedOptions[key];
        return updatedOptions;
      }
      return { ...prev, [key]: value };
    });
  };

  return (
    <VStack spacing={4} mb="6" width={["100%", "60%", "40%"]}>
      {/* Codec */}
      {options.codec && (
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
      )}

      {/* Bitrate */}
      {options.bitrate && (
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
      )}

      {/* Sample Rate */}
      {options.sampleRate && (
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
      )}

      {/* Channel */}
      {options.channel && (
        <Box>
          <Select
            placeholder="Select channel"
            value={selectedOptions.channel || ""}
            onChange={(e) => handleChange("channel", e.target.value)}
          >
            {options.channel.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Volume */}
      {options.volume && (
        <Box>
          <Text>Volume: {selectedOptions.volume || 1}</Text>
          <Slider
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
      )}

      {/* Qscale */}
      {options.qscale && (
        <Box>
          <Text>Quality Scale: {selectedOptions.qscale || options.qscale.min}</Text>
          <Slider
            min={options.qscale.min}
            max={options.qscale.max}
            step={1}
            value={selectedOptions.qscale || options.qscale.min}
            onChange={(value) => handleChange("qscale", value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      )}
    </VStack>
  );
};

export default AdvancedOptions;
