import { useState } from "react";
import { StyleSheet } from "react-native";

import { Appbar, Tab, Typography, View } from "@/components";

export default function OrderTabScreen() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Pesanan" />

      <View style={style.contenContainer}>
        <Tab
          tabs={[
            { key: "history", label: "Riwayat" },
            { key: "in-progress", label: "Dalam proses", indicator: true },
          ]}
          activeTab={activeTab}
          onPress={(key) => setActiveTab(key as string)}
        />
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
  },
});
