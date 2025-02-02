import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

type DataItem = {
  title: string;
};
export type SelectInputV2Props = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  withBorder?: boolean;
  data: DataItem[];
  onSelect: (selectedItem: DataItem, index: number) => void;
  value: string;
  placeholder?: string;
};
export function SelectInputV2(props: SelectInputV2Props) {
  const {
    leadingIcon,
    trailingIcon,
    value,
    withBorder = true,
    data = [],
    onSelect = () => {},
    placeholder = "",
  } = props;

  const { Colors } = useAppTheme();

  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      renderButton={(selected, isOpened) => (
        <View
          backgroundColor={selected ? "outlineborder" : "paper"}
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

          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            color={value ? "textprimary" : "textsecondary"}
            style={styles.textInput}
          >
            {value || placeholder}
          </Typography>

          {trailingIcon}
        </View>
      )}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              styles.dropdownItemStyle,
              {
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              },
            ]}
          >
            <Typography>{item.title}</Typography>
          </View>
        );
      }}
      dropdownStyle={{
        backgroundColor: Colors.paper,
        transform: [{ translateY: -20 }],
      }}
      dropdownOverlayColor="transparent"
    />
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
    flex: 1,
  },
  dropdownItemStyle: {
    padding: 8,
    borderRadius: 2,
  },
});
