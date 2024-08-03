import { StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Separator, Snackbar, Typography, View } from "@/components";

export default function PromoDetailScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top + 70 }]}
      backgroundColor="paper"
    >
      <Typography fontFamily="Poppins-Bold" fontSize={16} color="main">
        Diskon Travel Hingga 30%
      </Typography>

      <View style={styles.header}>
        <Typography color="textsecondary" fontFamily="Poppins-Regular">
          Berlaku hingga
        </Typography>
        <Typography color="textsecondary" fontFamily="Poppins-Regular">
          14 Juli 2024
        </Typography>
      </View>

      <Separator color="textprimary" />

      <Typography>Syarat & Ketentuan</Typography>
      <View style={styles.contentContainer}>
        <Typography fontFamily="Poppins-Regular" color="textsecondary">
          Lorem ipsum dolor sit amet consectetur. A sed sed erat est in odio
          convallis adipiscing. Scelerisque pharetra est convallis volutpat
          pellentesque sit. Odio sed condimentum dignissim nisl imperdiet amet
          pellentesque enim. Justo felis dolor et id rhoncus gravida ut.Lorem
          ipsum dolor sit amet consectetur. A sed sed erat est in odio convallis
          adipiscing. Scelerisque pharetra est convallis volutpat pellentesque
          sit. Odio sed condimentum dignissim nisl imperdiet amet pellentesque
          enim. Justo felis dolor et id rhoncus gravida ut.
        </Typography>
      </View>

      <Button
        onPress={async () => {
          await Clipboard.setStringAsync("kode promo");
          Snackbar.show({
            message: "Kode disalin",
          });
        }}
      >
        Salin Kode Vocer
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
