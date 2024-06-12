import { ScrollView, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  PostLoginPayload,
  postLoginPayloadSchema,
} from "@/apis/internal.api.type";
import {
  Button,
  PageWrapper,
  Snackbar,
  TextInput,
  TextLink,
  Typography,
  View,
} from "@/components";
import { useAuthLogin } from "@/features/auth/api/useAuthLogin";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation<any>();

  const loginMutation = useAuthLogin();

  const { control, handleSubmit, formState } = useForm<PostLoginPayload>({
    resolver: zodResolver(postLoginPayloadSchema),
    mode: "all",
  });

  const handleLoginMutation = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "(tabs)" }],
        });
        Snackbar.show({
          message: "Login berhasil!",
        });
      },
      onError: () => {
        Snackbar.show({
          message: "Login gagal, email atau password tidak sesuai",
        });
      },
    });
  });

  return (
    <PageWrapper backgroundColor="main" isLoading={loginMutation.isPending}>
      <ScrollView
        style={style.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          backgroundColor="paper"
          style={[style.content, { paddingBottom: insets.bottom + 37 }]}
        >
          <Typography fontFamily="Poppins-Bold">Silahkan Masuk!</Typography>

          <View style={style.formContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Email"
                  placeholder="Contoh@gmail.com"
                  keyboardType="email-address"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Kata Sandi"
                  placeholder="Kata Sandi"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  secureTextEntry
                />
              )}
            />
          </View>
          <View style={style.forgotPasswordWrapper}>
            <TextLink
              label="Lupa Kata Sandi?"
              onPress={() => router.push("/auth/forgot-password")}
            />
          </View>

          <Button disabled={!formState.isValid} onPress={handleLoginMutation}>
            Masuk
          </Button>
        </View>
      </ScrollView>
    </PageWrapper>
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
