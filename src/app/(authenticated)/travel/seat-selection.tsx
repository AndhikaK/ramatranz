import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Typography, View } from "@/components";
import { IconCIChecklist } from "@/components/icons";
import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { useAuthProfile } from "@/features/auth/store/auth-store";
import { CarSeat10 } from "@/features/travel/components";
import { useTravelTravelSchedule } from "@/features/travel/store/travel-store";

export default function SeatSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [selectedSeats, setSelectedSeat] = useState<string[]>([]);

  const userProfile = useAuthProfile();
  const traveSchedule = useTravelTravelSchedule();

  const handleSelectSeat = (seatNumber: string) => {
    const limit = 1;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeat(selectedSeats.filter((item) => item !== seatNumber));
    } else {
      if (selectedSeats.length < limit) {
        setSelectedSeat([...selectedSeats, seatNumber]);
      }
    }
  };

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar backIconPress={() => router.back()} title="Pilih Kursi" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.headerContainer}>
          <View style={[style.userInfoContainer, { borderColor: Colors.main }]}>
            <View style={{ flex: 1, gap: 12 }}>
              <Typography fontFamily="Poppins-Bold" fontSize={16}>
                1. {userProfile?.nama}
              </Typography>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Typography color="textsecondary">
                  {traveSchedule?.carModel}
                </Typography>
                {selectedSeats.length > 0 && (
                  <>
                    <View
                      backgroundColor="main"
                      style={{ height: 4, width: 4, borderRadius: 99 }}
                    />
                    <Typography color="textsecondary">
                      {selectedSeats
                        .sort((a, b) => parseFloat(a) - parseFloat(b))
                        .join(", ")}
                    </Typography>
                  </>
                )}
              </View>
            </View>

            <View
              style={{
                height: 16,
                width: 16,
                borderRadius: 99,
                justifyContent: "center",
                alignItems: "center",
              }}
              backgroundColor="secondary"
            >
              <IconCIChecklist color="paper" size={10} />
            </View>
          </View>

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

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CarSeat10
              filled={traveSchedule?.seatTaken || []}
              selected={selectedSeats}
              onSeatPress={handleSelectSeat}
            />
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
        <Button disabled={selectedSeats.length <= 0}>Lanjutkan</Button>
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
  userInfoContainer: {
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
});
