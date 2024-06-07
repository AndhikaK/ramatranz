import { StyleSheet } from "react-native";

import { Loader, View } from "@/components";

export default function InitialScreen() {
  return (
    <View style={style.container}>
      <Loader />
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
