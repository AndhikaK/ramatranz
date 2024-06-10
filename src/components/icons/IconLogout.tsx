import * as React from "react";
import Svg, { G, Mask, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconLogout({
  width = 24,
  height = 24,
  color = "textprimary",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      {...rest}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={25}
        height={24}
      >
        <Path fill="#000" d="M0.5 0H24.5V24H0.5z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.5 16v2a4 4 0 004 4h10c2.21 0 4-1.79 4-4V6a4 4 0 00-4-4h-10a4 4 0 00-4 4v2a1 1 0 002 0V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2h-10a2 2 0 01-2-2v-2a1.001 1.001 0 00-2 0zm7.586-5l-1.293-1.292a1 1 0 011.414-1.415l3 3a1 1 0 010 1.415l-3 3a1 1 0 01-1.414-1.415L12.086 13H3.5a1 1 0 010-2h8.586z"
          fill="#0064D2"
        />
      </G>
    </Svg>
  );
}
