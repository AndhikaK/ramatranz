import { useAppTheme } from "@/context/theme-context";

import { View, ViewProps } from "../view/View";

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
  color?: ViewProps["backgroundColor"];
} & ViewProps;
export function Separator(props: SeparatorProps) {
  const {
    orientation = "horizontal",
    thickness = 1,
    color = "outlineborder",
    style,
  } = props;

  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        {
          width: orientation === "horizontal" ? "100%" : thickness,
          height: orientation === "horizontal" ? thickness : "100%",
          backgroundColor: Colors?.[color || "outlineborder"],
        },
        style,
      ]}
    />
  );
}
