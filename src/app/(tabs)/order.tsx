import { StyleSheet } from "react-native";

import { Appbar, Typography, View } from "@/components";

export default function OrderTabScreen() {
  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Pesanan" />

      <View style={style.contenContainer}>
        <Typography>Tab pesanan</Typography>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenContainer: {
    paddingVertical: 37,
  },
});
