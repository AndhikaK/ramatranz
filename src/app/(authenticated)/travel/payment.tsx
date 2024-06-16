import { useState } from "react";
import { FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Appbar,
  Button,
  Checkbox,
  Loader,
  PageWrapper,
  Snackbar,
  Typography,
  View,
} from "@/components";
import { IconCarSide, IconPinSharp } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetPaymentMethodQuery } from "@/features/payment/api/useGetPaymentMethodQuery";
import { usePostProcessPaymentMutation } from "@/features/payment/api/usePostProcessPaymentMutation";
import { TravelTicketItem } from "@/features/travel/components";
import {
  useTravelPassenger,
  useTravelSchedule,
} from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";

export default function TravelPaymentScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();

  // state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);

  // store
  const travelSchedule = useTravelSchedule();
  const travelPassenger = useTravelPassenger();

  // query & mutation
  const paymentMethodQuery = useGetPaymentMethodQuery();
  const processPaymentMutation = usePostProcessPaymentMutation();

  // method
  const handleProcessPayment = () => {
    const processPaymentData = {};
    processPaymentMutation.mutate(processPaymentData, {
      onSuccess: () => {
        Snackbar.show({ message: "Order pesanan berhasil" });
        router.push("/payment/status");
      },
      onError: () => {
        Snackbar.show({
          message: "Order pesanan gagal, coba setelah beberapa saat",
          variant: "danger",
        });
      },
    });
  };

  if (!travelSchedule) return null;

  return (
    <PageWrapper
      isLoading={processPaymentMutation.isPending}
      backgroundColor="paper"
      style={styles.container}
    >
      <Appbar title="Pembayaran" backIconPress={() => router.back()} />
      <View style={styles.contentContainer}>
        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          Perjalananmu
        </Typography>

        <TravelTicketItem
          departureDate={new Date(travelSchedule?.departureDate)}
          destinationCity={travelSchedule?.originCity}
          destinationDepartureDate={
            new Date(travelSchedule?.destinationDepartureDate)
          }
          originCity={travelSchedule?.destinationCity}
          originDepartureDate={new Date(travelSchedule?.originDepartureDate)}
          icon={<IconCarSide color="main" />}
          customHeader={
            <View>
              <Typography color="secondary">
                {travelSchedule.carModel} {"\u2022"}{" "}
                {travelPassenger?.map((item) => item.seat).join(", ")}
              </Typography>
            </View>
          }
          customFooter={
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                gap: 10,
              }}
            >
              <IconPinSharp color="main" />
              <Typography>Titik Jemput</Typography>
            </View>
          }
        />

        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          Metode Pembayaran
        </Typography>

        <View
          style={[
            styles.paymentContainer,
            { borderColor: Colors.outlineborder },
          ]}
        >
          {paymentMethodQuery.isFetching ? (
            <View style={styles.loadingContainer}>
              <Loader />
            </View>
          ) : (
            <FlatList
              data={paymentMethodQuery.data?.data}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => setSelectedPaymentMethod(item.id)}
                >
                  <View style={styles.paymentItem}>
                    <Typography>{item.nama}</Typography>
                    <Checkbox selected={item.id === selectedPaymentMethod} />
                  </View>
                </TouchableWithoutFeedback>
              )}
              ListEmptyComponent={() => (
                <View style={styles.loadingContainer}>
                  <Typography fontFamily="OpenSans-Semibold">
                    Tidak ada data
                  </Typography>
                </View>
              )}
            />
          )}
        </View>

        <View backgroundColor="dangerlight" style={styles.warningWrapper}>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={6}
            color="dangerbase"
          >
            Mohon diperhatikan, setiap pembelian tiket tidak dapat dikembalikan.
            Pastikan untuk mempertimbangkan dengan baik sebelum membeli.
          </Typography>
        </View>
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
            {formatCurrency(
              travelSchedule?.price * (travelPassenger?.length || 0)
            )}
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
            disabled={!selectedPaymentMethod}
            onPressIn={handleProcessPayment}
          >
            Bayar
          </Button>
        </View>
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
  warningWrapper: {
    borderRadius: 2,
    padding: 10,
  },
  paymentContainer: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
