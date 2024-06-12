import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { Appbar, Snackbar, TextInput, Typography, View } from "@/components";
import { IconLogout } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import {
  useAuthActions,
  useAuthProfile,
} from "@/features/auth/store/auth-store";
import { removeItem } from "@/libs/async-storage";

export default function ProfileTabScreen() {
  const { Colors } = useAppTheme();

  const userProfile = useAuthProfile();
  const { clearAuthSession } = useAuthActions();

  const handleLogout = async () => {
    clearAuthSession();
    await removeItem("accesstoken");
    await removeItem("profile");
    Snackbar.show({ message: "Logout berhasil!" });
  };

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
            {userProfile?.nama}
          </Typography>
        </View>

        <TextInput label="Email" value={userProfile?.email} editable={false} />

        {!!userProfile?.no_telp && (
          <TextInput
            label="Nomor Telepon"
            value={userProfile?.no_telp}
            editable={false}
          />
        )}
        <TextInput label="Alamat" numberOfLines={5} value="" />
      </ScrollView>

      <TouchableWithoutFeedback onPress={handleLogout}>
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
