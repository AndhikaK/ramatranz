import { View as RNView, ViewProps as RNViewProps } from "react-native";

import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";

export type ViewProps = {
  backgroundColor?: AppColorUnion | "transparent";
} & RNViewProps;
export function View(props: ViewProps) {
  const { children, backgroundColor = "paper", style, ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <RNView
      style={[
        {
          backgroundColor:
            Colors[backgroundColor as AppColorUnion] || "transparent",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNView>
  );
}
