import { StyleSheet } from "react-native";

import { Typography, View } from "@/components";

export default function ProfileTabScreen() {
  return (
    <View style={style.container}>
      <Typography>Tab profile</Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
