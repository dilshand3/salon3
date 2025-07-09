import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const SearchIcon : React.FC = () => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    height={24}
    width={24}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path
        d="M21 21L15.8033 15.8033M7.5 10.5H13.5M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default SearchIcon;
