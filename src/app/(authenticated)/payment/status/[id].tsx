import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Appbar,
  Button,
  Loader,
  Separator,
  Snackbar,
  Typography,
  View,
} from "@/components";
import {
  IconCIChecklist,
  IconClock,
  IconCross,
  IconDownload,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetPaymentStatusDetail } from "@/features/payment/api/useGetPaymentStatusDetail";
import { useHardwareBackpress } from "@/hooks/useHardwareBackPress";

export default function PaymentStatusScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const params = useLocalSearchParams<{ id: string }>();

  const { Colors } = useAppTheme();

  const handleOnBackPress = useCallback(() => {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];

    if (prevRoute.name === "travel/payment") {
      navigation.reset({
        index: 0,
        routes: [{ name: "(authenticated)" }],
      });
    } else {
      router.back();
    }
  }, [navigation, router]);

  useHardwareBackpress(handleOnBackPress);

  // query
  const paymentStatusQuery = useGetPaymentStatusDetail(params?.id || "");

  useEffect(() => {
    if (paymentStatusQuery.error) {
      Snackbar.show({
        message: "Terjadi kesalahan, coba kembali nanti",
        variant: "danger",
      });
      handleOnBackPress();
    }
  }, [handleOnBackPress, paymentStatusQuery.error]);

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar title="Status Pembayaran" backIconPress={handleOnBackPress} />

      <View style={styles.contentContainer}>
        {paymentStatusQuery.isFetching ? (
          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </View>
        ) : paymentStatusQuery.data?.data.status === "success" ? (
          <PaymentSuccess />
        ) : paymentStatusQuery.data?.data.status === "failed" ? (
          <PaymentFailed />
        ) : paymentStatusQuery.data?.data.status === "waiting" ? (
          <PaymentWaiting />
        ) : null}
      </View>

      <View
        style={[
          styles.bottomActionContainer,
          {
            paddingBottom: insets.bottom + 24,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <Button onPress={() => router.back()}>Kembali ke Beranda</Button>
      </View>
    </View>
  );
}

function PaymentFailed() {
  const { Colors } = useAppTheme();

  return (
    <View style={[styles.statusWrapper, { borderColor: Colors.outlineborder }]}>
      <View backgroundColor="dangerbase" style={styles.roundedIconWrapper}>
        <IconCross color="paper" size={32} />
      </View>

      <Typography fontFamily="Poppins-Bold" fontSize={20} color="dangerbase">
        Pembayaran Gagal!
      </Typography>

      <Separator />

      <Typography
        color="dangerbase"
        fontSize={13}
        style={{ textAlign: "center" }}
      >
        Pembayaran gagal karena melebihi batas waktu yang telah ditentukan,
        silahkan pesan kembali.
      </Typography>
    </View>
  );
}

function PaymentWaiting() {
  const { Colors } = useAppTheme();

  return (
    <View style={[styles.statusWrapper, { borderColor: Colors.outlineborder }]}>
      <View backgroundColor="textsecondary" style={styles.roundedIconWrapper}>
        <IconClock color="paper" size={40} />
      </View>

      <Typography fontFamily="Poppins-Bold" fontSize={20} color="textsecondary">
        Menunggu Pembayaran...
      </Typography>

      <Separator />

      <Typography
        color="textsecondary"
        fontSize={13}
        style={{ textAlign: "center" }}
      >
        Silahkan lakukan pembayaran dengan batas waktu yang telah ditentukan.
      </Typography>
    </View>
  );
}

function PaymentSuccess() {
  const { Colors } = useAppTheme();

  return (
    <View style={[styles.statusWrapper, { borderColor: Colors.outlineborder }]}>
      <View backgroundColor="success" style={styles.roundedIconWrapper}>
        <IconCIChecklist color="paper" size={40} />
      </View>

      <Typography fontFamily="Poppins-Bold" fontSize={20}>
        Pembayaran Sukses!
      </Typography>

      <Separator />

      <StatusItem
        left={{
          label: "Nomor Pembayaran",
          value: "INV567489240UI",
        }}
        right={{
          label: "Metode Pembayaran",
          value: "Bank Transfer",
        }}
      />
      <StatusItem
        left={{
          label: "Tanggal",
          value: "INV567489240UI",
        }}
        right={{
          label: "Waktu",
          value: "Bank Transfer",
        }}
      />
      <StatusItem
        left={{
          label: "Jumlah Dibayarkan",
          value: "INV567489240UI",
        }}
        right={{
          label: "Status",
          value: "Bank Transfer",
        }}
      />

      <Separator />

      <View style={{ width: "100%" }}>
        <Button
          variant="secondary"
          style={{
            backgroundColor: Colors.bgsecondary,
            borderColor: Colors.bgsecondary,
          }}
        >
          <IconDownload color="main" />
          <Typography fontFamily="Poppins-Bold" color="main">
            Unduh
          </Typography>
        </Button>
      </View>
    </View>
  );
}

type StatusItemProps = {
  left: {
    label: string;
    value: string;
  };
  right: {
    label: string;
    value: string;
  };
};
function StatusItem({ left, right }: StatusItemProps) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Typography color="textsecondary">{left.label}</Typography>
        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          {left.value}
        </Typography>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Typography color="textsecondary">{right.label}</Typography>
        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          {right.value}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: 24,
    padding: 24,
  },
  statusWrapper: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 16,
    paddingVertical: 24,
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomActionContainer: {
    padding: 24,
    borderTopWidth: 1,
  },
  roundedIconWrapper: {
    height: 80,
    width: 80,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
});
