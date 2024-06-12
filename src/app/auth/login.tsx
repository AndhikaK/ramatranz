import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  PostLoginPayload,
  postLoginPayloadSchema,
} from "@/apis/internal.api.type";
import {
  Button,
  PageWrapper,
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

  const loginMutation = useAuthLogin();

  const { control, handleSubmit, formState } = useForm<PostLoginPayload>({
    resolver: zodResolver(postLoginPayloadSchema),
    mode: "all",
  });

  const handleLoginMutation = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => console.log(response),
      onError: (error) => console.log(error.response?.data),
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
