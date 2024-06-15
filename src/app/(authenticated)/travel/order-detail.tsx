import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Typography, View } from "@/components";
import { IconCarSide } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { TravelTicketItem } from "@/features/travel/components";
import {
  useTravelPassenger,
  useTravelSchedule,
} from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";

export default function TravelOrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const travelSchedule = useTravelSchedule();
  const travelPassenger = useTravelPassenger();

  if (!travelSchedule) return null;

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Detail Pesanan" backIconPress={() => router.back()} />

      <View style={style.contentContainer}>
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
              <Typography>
                {travelSchedule.carModel} {"\u2022"}{" "}
                {travelPassenger?.map((item) => item.seat).join(", ")}
              </Typography>
            </View>
          }
          customFooter={
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <Typography>Titik Jemput</Typography>
              <Typography>Titik Antar</Typography>
            </View>
          }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontFamily="Poppins-Bold" fontSize={16}>
            Daftar Penumpang
          </Typography>
          <Button>Tambah</Button>
        </View>

        {travelPassenger?.map((passenger) => (
          <View
            key={passenger.passengerName}
            style={[
              style.passengerContainer,
              { borderColor: Colors.outlineborder },
            ]}
          >
            <View>
              <Typography
                fontFamily="Poppins-Bold"
                fontSize={16}
                numberOfLines={1}
              >
                {passenger.passengerName}
              </Typography>
              <Typography color="textsecondary">
                {travelSchedule.carModel} {"\u2022"} {passenger.seat}
              </Typography>
            </View>

            <Button variant="secondary">Ganti kursi</Button>
          </View>
        ))}
      </View>

      <View
        style={[
          style.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(travelSchedule?.price || 0)}
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
          <Button onPressIn={() => router.push("/travel/seat-selection")}>
            {"Proses ke" + `\n` + "Pembayaran"}
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
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
  passengerContainer: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
