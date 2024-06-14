import { useState } from "react";

import { useAppTheme } from "@/context/theme-context";
import { formatDate } from "@/utils/datetime";
import RNDateTimePicker, {
  BaseProps,
} from "@react-native-community/datetimepicker";

import { TextInputV2, TextInputV2Props } from "../text-input-v2/TextInputV2";

export type DateInputV2Props = {
  value: Date;
} & Pick<TextInputV2Props, "placeholder" | "trailingIcon" | "leadingIcon"> &
  BaseProps;
export function DateInputV2(props: DateInputV2Props) {
  const { value, placeholder, trailingIcon, leadingIcon } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { Colors } = useAppTheme();

  return (
    <>
      <TextInputV2
        trailingIcon={trailingIcon}
        leadingIcon={leadingIcon}
        value={formatDate(value)}
        placeholder={placeholder}
        onTouchablePress={() => setShowDatePicker(!showDatePicker)}
        asTouchable
      />

      {showDatePicker && (
        <RNDateTimePicker
          value={value || new Date()}
          mode="date"
          accentColor={Colors.main}
        />
      )}
    </>
  );
}
