import {
  Button,
  PromoListItem,
  TextInput,
  TextInputV2,
  Typography,
  View,
} from "@/components";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PromoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      backgroundColor="paper"
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.searchPromoContainer} backgroundColor="paper">
        <View style={{ flex: 1 }}>
          <TextInputV2
            leadingIcon={<View style={{ height: 46 }} />}
            placeholder="Masukan Kode Promosi"
          />
        </View>

        <Button>Terapkan</Button>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 1, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]}
        renderItem={() => <PromoListItem />}
        style={{ flex: 1 }}
        contentContainerStyle={styles.promoListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  promoListContainer: {
    gap: 16,
    padding: 24,
    paddingTop: 8,
    flexGrow: 1,
  },
  searchPromoContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 4,
  },
});
