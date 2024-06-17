import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Separator, TextInputV2, Typography, View } from "@/components";
import {
  IconPackageExport,
  IconPackageImport,
  IconSwap,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export default function PackageShipmentFormScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { Colors } = useAppTheme();

  return (
    <View backgroundColor="paper" style={styles.container}>
      <View
        backgroundColor="main"
        style={[styles.headerBack, { height: insets.top + 106 }]}
      />

      <Appbar
        variant="light"
        title="Paket"
        backgroundColor="transparent"
        hasBorder={false}
        colorSheme="dark"
        backIconPress={() => router.back()}
      />

      <View
        backgroundColor="paper"
        style={[styles.shipmentBox, { borderColor: Colors.outlineborder }]}
      >
        <Typography fontFamily="Poppins-Medium" fontSize={16}>
          Mau kirim paket kemana?
        </Typography>

        <View
          style={[styles.destinationBox, { borderColor: Colors.outlineborder }]}
        >
          <TextInputV2
            placeholder="Lampung"
            leadingIcon={
              <View>
                <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                  Dari
                </Typography>
                <IconPackageImport width={20} height={20} color="main" />
              </View>
            }
            withBorder={false}
            asTouchable
            onTouchablePress={() =>
              router.push({
                pathname: "/package/search-place/[type]",
                params: {
                  type: "from",
                },
              })
            }
          />
          <Separator />
          <TextInputV2
            placeholder="Palembang"
            leadingIcon={
              <View>
                <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                  Ke
                </Typography>
                <IconPackageExport width={20} height={20} color="main" />
              </View>
            }
            withBorder={false}
            asTouchable
          />

          <View backgroundColor="main" style={styles.destinationIconSwap}>
            <IconSwap width={20} height={20} color="paper" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBack: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "absolute",
    top: 0,
    width: "100%",
  },

  shipmentBox: {
    margin: 24,
    marginTop: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderRadius: 2,
  },
  destinationBox: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    gap: 12,
    justifyContent: "center",
  },
  destinationIconSwap: {
    height: 40,
    width: 40,
    borderRadius: 99,
    position: "absolute",
    right: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
