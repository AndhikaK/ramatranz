import { StyleSheet } from "react-native";

import { Typography, View } from "@/components";

export default function ArticleTabScreen() {
  return (
    <View style={styles.container}>
      <Typography>Requiem</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
