import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  PostRegisterPayload,
  postRegisterPayloadSchema,
} from "@/apis/internal.api.type";
import {
  Button,
  Snackbar,
  TextInput,
  TextLink,
  Typography,
  View,
} from "@/components";
import { useAuthRegister } from "@/features/auth/api/useAuthRegister";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const registerMutation = useAuthRegister();

  const { control, formState, handleSubmit } = useForm<PostRegisterPayload>({
    defaultValues: {
      role_id: 3,
    },
    resolver: zodResolver(postRegisterPayloadSchema),
    mode: "all",
  });

  const handleRegister = handleSubmit((payload) => {
    registerMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log(response);
        Snackbar.show({
          message: "Register berhasil, silahkan login dengan akun yg terdaftar",
        });

        router.replace("/auth/login");
      },
      onError: (error) => console.log(error.response?.data),
    });
  });

  console.log(formState);

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
            <Controller
              control={control}
              name="nama"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Nama *"
                  placeholder="Nama"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Email *"
                  placeholder="Contoh@gmail.com"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="no_telp"
              render={({ field }) => (
                <TextInput
                  label="Nomor Telepon *"
                  placeholder="08276287687287"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextInput
                  label="Kata Sandi *"
                  placeholder="Kata Sandi"
                  secureTextEntry
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Konfirmasi Kata Sandi *"
                  placeholder="Konfirmasi Kata Sandi"
                  secureTextEntry
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <View style={style.alreadyHasAccountWrapper}>
              <Typography fontFamily="OpenSans-Regular" fontSize={12}>
                Sudah punya akun?
              </Typography>

              <TextLink
                label=" Masuk"
                onPress={() => router.replace("/auth/login")}
              />
            </View>
          </View>
          <Button disabled={!formState.isValid} onPress={handleRegister}>
            Daftar
          </Button>
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
  alreadyHasAccountWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
