import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

import { Appbar, Button, TextInputV2, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { formatCurrency } from "@/utils/common";

export default function PackageDetailFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar title="Detail Paket" backIconPress={() => router.back()} />

      <View style={styles.contentContainer}>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <InputWrapper
            title="Tanggal Dikirim"
            isMandatory
            containerStyle={{ flex: 1 }}
          >
            <TextInputV2 />
          </InputWrapper>
          <InputWrapper
            title="Tanggal Diterima"
            isMandatory
            containerStyle={{ flex: 1 }}
          >
            <TextInputV2 />
          </InputWrapper>
        </View>

        <InputWrapper title="Jenis Paket" isMandatory>
          <TextInputV2 />
        </InputWrapper>

        <InputWrapper title="Deskripsi" isMandatory>
          <TextInputV2 numberOfLines={4} />
        </InputWrapper>

        <InputWrapper title="Total Berat" isMandatory>
          <TextInputV2 />
        </InputWrapper>
      </View>

      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(80000)}
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            color="textsecondary"
          >
            Total Harga
          </Typography>
        </View>
        <View style={{ flex: 1 }}>
          <Button
          // disabled={!selectedPaymentMethod}
          // onPressIn={handleProcessPayment}
          >
            Bayar
          </Button>
        </View>
      </View>
    </View>
  );
}

type InputWrapperProps = {
  title: string;
  isMandatory?: boolean;
  containerStyle?: ViewProps["style"];
} & PropsWithChildren;
function InputWrapper({
  title,
  isMandatory = false,
  containerStyle,
  children,
}: InputWrapperProps) {
  return (
    <View style={containerStyle}>
      <Typography>
        {title}
        {isMandatory && <Typography color="dangerbase"> *</Typography>}
      </Typography>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 30,
    gap: 30,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
});
