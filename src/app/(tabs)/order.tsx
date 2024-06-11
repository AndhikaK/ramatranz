import { useState } from "react";
import { StyleSheet } from "react-native";

import { Appbar, Tab, View } from "@/components";

export default function OrderTabScreen() {
  const [activeTab, setActiveTab] = useState("history");
  const [activeFilter, setActiveFilter] = useState("travel");

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Pesanan" />

      <View style={style.contenContainer}>
        <View style={style.tabContainer}>
          <Tab
            tabs={[
              { key: "history", label: "Riwayat" },
              { key: "in-progress", label: "Dalam proses", indicator: true },
            ]}
            activeTab={activeTab}
            onPress={(key) => setActiveTab(key as string)}
          />

          <Tab
            tabs={[
              { key: "travel", label: "Travel" },
              { key: "package", label: "Paket" },
            ]}
            activeTab={activeFilter}
            onPress={(key) => setActiveFilter(key as string)}
            variant="button"
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenContainer: {
    paddingVertical: 37,
    padding: 24,
    gap: 40,
  },
  tabContainer: {
    gap: 10,
  },
});
