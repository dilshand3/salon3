import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon2 : React.FC = () => (
  <Svg
    width={44}
    height={44}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <Path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
    <Path
      fillRule="evenodd"
      d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SearchIcon2;
