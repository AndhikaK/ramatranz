import { Text, TextProps } from "react-native";

import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";

export type TypographyProps = {
  fontFamily?: string;
  color?: AppColorUnion;
  fontSize?: number;
} & TextProps;

export function Typography(props: TypographyProps) {
  const {
    children,
    fontFamily = "Poppins-Bold",
    color = "textprimary",
    style,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <Text
      style={[{ fontFamily, color: Colors[color as AppColorUnion] }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
