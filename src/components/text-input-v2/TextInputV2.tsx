import { ReactNode } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
} from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { View } from "../view/View";

export type TextInputV2Props = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  withBorder?: boolean;
  asTouchable?: boolean;
  onTouchablePress?: () => void;
} & TextInputProps;
export function TextInputV2(props: TextInputV2Props) {
  const {
    leadingIcon,
    trailingIcon,
    withBorder = true,
    asTouchable = false,
    onTouchablePress,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback
      onPress={onTouchablePress}
      disabled={!asTouchable}
    >
      <View
        style={[
          styles.container,
          {
            borderWidth: withBorder ? 1 : 0,
            borderColor: Colors.outlineborder,
            padding: withBorder ? 12 : 0,
          },
        ]}
      >
        {leadingIcon}

        <TextInput
          placeholderTextColor={Colors.textsecondary}
          style={[styles.textInput, { color: Colors.textprimary }]}
          editable={!asTouchable}
          {...rest}
        />

        {trailingIcon}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
  },
  textInput: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    flex: 1,
  },
});
