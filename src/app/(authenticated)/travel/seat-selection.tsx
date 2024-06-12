import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Typography, View } from "@/components";
import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";

export default function SeatSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar backIconPress={() => router.back()} title="Pilih Kursi" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.headerContainer}>
          <View style={style.seatDescriptionContainer}>
            <SeatDescription color="quarternary" label="Terisi" />
            <SeatDescription color="dangerbase" label="Terpilih" />
            <SeatDescription color="main" label="Tersedia" />
          </View>

          <View backgroundColor="dangerlight" style={style.informationBanner}>
            <Typography
              fontFamily="OpenSans-Semibold"
              fontSize={7}
              color="dangerbase"
            >
              WAJIB BELI UNTUK ANAK DIATAS USIA 7 TAHUN{" "}
            </Typography>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          style.bottomActionContainer,
          {
            paddingBottom: insets.bottom + 24,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <Button>Lanjutkan</Button>
      </View>
    </View>
  );
}

type SeatDescriptionProps = {
  label: string;
  color: AppColorUnion;
};
function SeatDescription({ label, color }: SeatDescriptionProps) {
  return (
    <View style={style.seatDescriptionItem}>
      <View backgroundColor={color} style={style.seatDescriptionIndicator} />
      <Typography fontFamily="OpenSans-Regular" fontSize={14}>
        {label}
      </Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 24,
    gap: 24,
  },
  informationBanner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 15,
    borderRadius: 2,
  },
  bottomActionContainer: {
    padding: 24,
    borderTopWidth: 1,
  },
  seatDescriptionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seatDescriptionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  seatDescriptionIndicator: {
    height: 16,
    width: 16,
    borderRadius: 2,
  },
});
