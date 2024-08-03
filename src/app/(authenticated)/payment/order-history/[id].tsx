import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Appbar, Separator, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { useHardwareBackpress } from "@/hooks/useHardwareBackPress";

export default function OrderHistoryScreen() {
  const { goBackAction } = useHardwareBackpress();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{ id: "packet" | "travel" }>();

  // query
  // const paymentStatusQuery = useGetPaymentStatusDetail(params?.id || "");

  return (
    <View backgroundColor="paper" style={[styles.container]}>
      <Appbar title="Detail" backIconPress={goBackAction} />

      <View style={styles.contentContainer}>
        <View>
          <View style={styles.row}>
            <Typography color="main" fontFamily="Poppins-Bold" fontSize={18}>
              {params.id === "travel" ? "Travel" : "Paket"}
            </Typography>
            <Typography fontFamily="Poppins-Regular" color="textsecondary">
              Selsa , 09 Juli 2024
            </Typography>
          </View>
          <View style={styles.row}>
            <Typography fontFamily="Poppins-Regular">Kode pemesanan</Typography>
            <Typography fontFamily="Poppins-Regular" color="textsecondary">
              08.00
            </Typography>
          </View>

          <Typography fontFamily="Poppins-Regular" color="success">
            Sukses
          </Typography>
        </View>

        <Separator color="textprimary" />

        <View>
          <Typography fontFamily="Poppins-SemiBold" fontSize={16} color="main">
            Rute
          </Typography>

          <View style={{ flexDirection: "row", gap: 32 }}>
            <View
              style={{
                height: 95,
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <View
                style={{
                  width: 1,
                  height: "100%",
                  position: "absolute",
                  backgroundColor: Colors.textsecondary,
                  left: 6,
                }}
              />
              <View
                style={{
                  borderRadius: 99,
                  width: 12,
                  height: 12,
                  borderColor: Colors.main,
                  backgroundColor: Colors.paper,
                  borderWidth: 1,
                }}
              />
              <View
                style={{
                  borderRadius: 99,
                  width: 12,
                  height: 12,
                  borderColor: Colors.main,
                  backgroundColor: Colors.main,
                  borderWidth: 1,
                }}
              />
            </View>
            <View style={{ gap: 32 }}>
              <View>
                <Typography fontFamily="Poppins-SemiBold" fontSize={16}>
                  Palembang
                </Typography>
                <Typography fontFamily="Poppins-Regular">
                  {params.id === "travel"
                    ? "Titik jemput"
                    : "Alamat Pengambilan"}
                </Typography>
              </View>
              <View>
                <Typography fontFamily="Poppins-SemiBold" fontSize={16}>
                  Lampung
                </Typography>
                <Typography fontFamily="Poppins-Regular">
                  {params.id === "travel"
                    ? "Titik antar"
                    : "Alamat Pengantaran"}
                </Typography>
              </View>
            </View>
          </View>
        </View>

        <Separator />

        <View style={{ gap: 16 }}>
          <Typography fontFamily="Poppins-SemiBold" fontSize={16} color="main">
            Detail
          </Typography>

          {params.id === "travel" ? (
            <>
              <DetailItem label="Mobil" value="Toyota Haice" />
              <DetailItem label="Kursi" value="8,9,10" />
              <DetailItem label="Total Harga" value="Rp. 750.000" />
            </>
          ) : (
            <>
              <DetailItem label="Jenis Paket" value="Makanan" />
              <DetailItem label="Total Berat" value="2 Kg" />
              <DetailItem
                label="Deskripsi Paket"
                value="Lorem ipsum dolor  sit amet consectetur."
              />
              <DetailItem label="Total Harga" value="Rp. 750.000" />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

function DetailItem({ value = "", label = "" }) {
  return (
    <View style={[styles.row]}>
      <View style={{ flex: 1 }}>
        <Typography fontFamily="Poppins-SemiBold" fontSize={14}>
          {label}
        </Typography>
      </View>
      <View style={{ flex: 1 }}>
        <Typography fontFamily="Poppins-SemiBold" fontSize={14}>
          : {value}
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
    gap: 24,
    padding: 24,
    paddingTop: 34,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
