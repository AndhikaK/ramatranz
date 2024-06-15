import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { TravelTicketItem } from "@/features/travel/components";
import { useTravelTravelSchedule } from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";

export default function TravelOrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const travelSchedule = useTravelTravelSchedule();

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Detail Pesanan" backIconPress={() => router.back()} />

      <View style={style.contentContainer}>
        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          Perjalananmu
        </Typography>

        <TravelTicketItem />

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
            {"Proses ke" + `\n` + "pembayaran"}
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
});
