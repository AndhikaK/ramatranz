import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, TextInput, Typography, View } from "@/components";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View
        backgroundColor="main"
        style={[style.container, { paddingTop: insets.top }]}
      >
        <View style={style.headerContainer}>
          <Typography fontFamily="Poppins-Bold" fontSize={24} color="paper">
            Daftar
          </Typography>
          <Typography fontFamily="Poppins-Medium" fontSize={14} color="paper">
            buat akun baru anda!
          </Typography>
        </View>

        <View
          backgroundColor="paper"
          style={[
            style.contentContainer,
            { paddingBottom: insets.bottom + 37 },
          ]}
        >
          <View style={style.formContainer}>
            <TextInput label="Nama *" placeholder="Nama" />
            <TextInput label="Email *" placeholder="Contoh@gmail.com" />
            <TextInput label="Nomor Telepon *" placeholder="08276287687287" />
            <TextInput
              label="Kata Sandi *"
              placeholder="Kata Sandi"
              secureTextEntry
            />
            <TextInput
              label="Konfirmasi Kata Sandi *"
              placeholder="Konfirmasi Kata Sandi"
              secureTextEntry
            />
          </View>
          <Button>Daftar</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: "auto",
    paddingHorizontal: 35,
    minHeight: 100,
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 35,
    paddingTop: 54,
  },
  formContainer: {
    gap: 16,
    marginBottom: 40,
  },
});
