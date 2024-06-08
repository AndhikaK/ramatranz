import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Loader, View } from "@/components";

export default function InitialScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/initial");
    }, 3000);
  }, []);

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
