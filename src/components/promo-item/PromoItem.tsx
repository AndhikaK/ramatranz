import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

export type PromoItemProps = {
  imgUrl: string;
} & TouchableHighlightProps;
export function PromoItem(props: PromoItemProps) {
  const { imgUrl, ...rest } = props;

  return (
    <TouchableHighlight {...rest}>
      <Image source={{ uri: imgUrl }} style={styles.container} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 187,
    width: 326,
    resizeMode: "cover",
  },
});
