import { ReactNode } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";

import { IconChevronLeft } from "../icons";
import { Typography } from "../typography/Typography";
import { View, ViewProps } from "../view/View";

export type AppbarProps = {
  backgroundColor?: AppColorUnion | "transparent";
  title?: ReactNode;
  backIcon?: ReactNode;
  backIconPress?: () => void;
  hasBorder?: boolean;
  colorSheme?: "dark" | "light";
} & ViewProps;
export function Appbar(props: AppbarProps) {
  const {
    backgroundColor = "paper",
    title,
    backIcon,
    backIconPress,
    hasBorder = true,
    colorSheme = "light",
  } = props;

  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        style.container,
        {
          paddingTop: insets.top,
          backgroundColor:
            Colors[backgroundColor as AppColorUnion] || backgroundColor,
          borderBottomWidth: hasBorder ? 1 : 0,
          borderBottomColor: Colors.outlineborder,
        },
      ]}
    >
      <View style={style.appbarWrapper}>
        {!!backIconPress && (
          <TouchableWithoutFeedback onPress={backIconPress}>
            <View style={style.iconWrapper}>
              {backIcon || (
                <IconChevronLeft
                  color={colorSheme === "dark" ? "paper" : "textprimary"}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
        <View style={style.titleWrapper}>
          {typeof title === "string" ? (
            <Typography
              fontFamily="Poppins-Bold"
              fontSize={16}
              color={colorSheme === "dark" ? "paper" : "textprimary"}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
        </View>

        {!!backIconPress && <View style={style.iconWrapper} />}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
  },
  appbarWrapper: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  },
  iconWrapper: {
    height: 24,
    width: 24,
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
