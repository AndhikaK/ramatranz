import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Typography, View } from "@/components";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View backgroundColor="main" style={style.container}>
      <View style={[style.content, { paddingBottom: insets.bottom + 37 }]}>
        <Typography fontFamily="Poppins-Bold">Silahkan Masuk!</Typography>

        <View style={style.formContainer}></View>

        <Button>Masuk</Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: "auto",
    paddingTop: 54,
    paddingHorizontal: 35,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  formContainer: {
    marginTop: 30,
    marginBottom: 80,
  },
});
