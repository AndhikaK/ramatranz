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
  const { children, variant = "primary", disabled = false, ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable disabled={disabled} {...rest}>
      {(pressable) => (
        <View
          backgroundColor={
            variant === "primary"
              ? disabled
                ? "outlineborder"
                : "main"
              : "paper"
          }
          style={[
            style.container,
            {
              borderColor: disabled ? Colors.outlineborder : Colors.main,
            },
          ]}
        >
          <View style={style.childrenWrapper}>
            {typeof children === "string" ? (
              <Typography
                fontFamily="OpenSans-Semibold"
                color={
                  variant === "primary"
                    ? "paper"
                    : disabled
                      ? "outlineborder"
                      : "main"
                }
              >
                {children}
              </Typography>
            ) : (
              children
            )}
          </View>
          {pressable.pressed && (
            <View
              style={[
                style.mask,
                {
                  backgroundColor: `${Colors.main}${variant === "primary" ? "80" : "0D"}`,
                },
              ]}
            />
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
    borderWidth: 1,
    overflow: "hidden",
  },
  childrenWrapper: {
    paddingHorizontal: 16,
  },
  mask: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
