import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SearchIcon1: React.FC = () => (
  <Svg
    width={34}
    height={34}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
  </Svg>
);
export default SearchIcon1;
