import { StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

import { Typography, View } from "@/components";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Typography style={styles.title}>This screen doesn't exist.</Typography>

        <Link href="/" style={styles.link}>
          <Typography style={styles.linkText}>Go to home screen!</Typography>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
