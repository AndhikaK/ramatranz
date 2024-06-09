import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type TabProps = TouchableWithoutFeedbackProps & {
  tabs: {
    key: string;
    label: string;
  }[];
  activeTab: string;
  onPress: (key: string) => void;
};
export function Tab(props: TabProps) {
  const { tabs, activeTab, onPress = () => {} } = props;

  return (
    <View style={style.container}>
      {tabs.map(({ key, label, ...rest }) => (
        <TouchableWithoutFeedback
          key={key}
          onPress={() => onPress(key)}
          {...rest}
        >
          <View style={style.touchableContainer}>
            <Typography
              fontFamily="Poppins-SemiBold"
              fontSize={12}
              color={activeTab === key ? "main" : "textprimary"}
            >
              {label}
            </Typography>

            {activeTab === key && (
              <View backgroundColor="main" style={style.indicator} />
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  touchableContainer: {
    minWidth: 80,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    height: 2,
    borderRadius: 99,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
