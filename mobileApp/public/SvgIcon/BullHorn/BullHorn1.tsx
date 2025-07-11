import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BullHorn1: React.FC = () => (
    <Svg
        width={36}
        height={36}
        fill="none"
        viewBox="0 0 24 24"
    >
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"
        />
    </Svg>
);
export default BullHorn1;
