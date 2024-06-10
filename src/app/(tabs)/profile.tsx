import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { Appbar, TextInput, Typography, View } from "@/components";
import { IconLogout } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export default function ProfileTabScreen() {
  const { Colors } = useAppTheme();

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Akun" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, gap: 27, padding: 27 }}
      >
        <View style={style.avatarContainer}>
          <Image
            style={[style.avatarImg, { backgroundColor: Colors.outlineborder }]}
          />

          <Typography fontFamily="Poppins-SemiBold" fontSize={20}>
            Qurrota Aini
          </Typography>
        </View>

        <TextInput
          label="Nama"
          value="Qurrotaaini@gmail.com"
          editable={false}
        />
        <TextInput
          label="Nomor Telepon"
          value="095764156224"
          editable={false}
        />
        <TextInput label="Alamat" numberOfLines={5} />
      </ScrollView>

      <TouchableWithoutFeedback>
        <View backgroundColor="outlineborder" style={style.logoutButton}>
          <IconLogout />

          <Typography fontFamily="Poppins-Medium" fontSize={16}>
            Log Out
          </Typography>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    gap: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImg: {
    height: 80,
    width: 80,
    borderRadius: 99,
  },
  logoutButton: {
    height: 48,
    paddingHorizontal: 48,
    alignItems: "center",
    gap: 16,
    flexDirection: "row",
  },
});
