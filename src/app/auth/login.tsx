import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, TextInput, TextLink, Typography, View } from "@/components";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View backgroundColor="main" style={style.container}>
      <View
        backgroundColor="paper"
        style={[style.content, { paddingBottom: insets.bottom + 37 }]}
      >
        <Typography fontFamily="Poppins-Bold">Silahkan Masuk!</Typography>

        <View style={style.formContainer}>
          <TextInput label="Email" placeholder="Contoh@gmail.com" />
          <TextInput
            label="Kata Sandi"
            placeholder="Kata Sandi"
            secureTextEntry
          />
        </View>
        <View style={style.forgotPasswordWrapper}>
          <TextLink
            label="Lupa Kata Sandi?"
            onPress={() => router.push("/auth/forgot-password")}
          />
        </View>

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
    gap: 36,
  },
  forgotPasswordWrapper: {
    marginBottom: 80,
    marginTop: 16,
    alignItems: "flex-end",
  },
});
