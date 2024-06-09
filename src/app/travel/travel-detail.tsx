import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Tab, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

export default function TravelDetailScreen() {
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [activeTab, setActiveTab] = useState("description");

  return (
    <View
      backgroundColor="paper"
      style={[style.container, { paddingTop: insets.top }]}
    >
      <Image
        source={{
          uri: "data:image/jpeg;base64,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",
        }}
        style={style.image}
      />

      <View style={{ flex: 1 }}>
        <View style={style.tabContainer}>
          <Tab
            tabs={[
              { key: "description", label: "Deskripsi" },
              { key: "rute", label: "Rute" },
              { key: "ticket", label: "Tiket" },
            ]}
            activeTab={activeTab}
            onPress={(key) => setActiveTab(key as string)}
          />
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
            Rp. 350.000
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
          <Button>Pilih</Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 212,
    resizeMode: "cover",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
  tabContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
});
