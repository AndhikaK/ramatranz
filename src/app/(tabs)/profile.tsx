import { StyleSheet } from "react-native";

import { Appbar, View } from "@/components";

export default function ProfileTabScreen() {
  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Akun" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
