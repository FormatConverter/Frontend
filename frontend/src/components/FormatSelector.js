import React from "react";
import { Select } from "@chakra-ui/react";

const FormatSelector = ({ format, setFormat, allowedFormats }) => (
  <Select
    placeholder="Select format"
    value={format}
    onChange={(e) => setFormat(e.target.value)}
  >
    {allowedFormats.map((fmt) => (
      <option key={fmt} value={fmt}>
        {fmt.toUpperCase()}
      </option>
    ))}
  </Select>
);

export default FormatSelector;
