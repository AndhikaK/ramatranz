import { ReactNode } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
} & PressableProps;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable {...rest}>
      {(pressable) => (
        <View
          backgroundColor={variant === "primary" ? "main" : "paper"}
          style={[
            style.container,
            {
              borderColor: Colors.main,
            },
          ]}
        >
          {typeof children === "string" ? (
            <Typography
              fontFamily="OpenSans-Semibold"
              color={variant === "primary" ? "paper" : "main"}
            >
              {children}
            </Typography>
          ) : (
            children
          )}
        </View>
      )}
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    borderRadius: 2,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
});
