import {
  Image,
  ImageSourcePropType,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "@/context/theme-context";
import { Typography, View } from "@/components";

export type ArticleItemProps = {
  imgSource: ImageSourcePropType;
  title: string;
  subtitle: string;
  price: string;
} & PressableProps;
export function ArticleItem(props: ArticleItemProps) {
  const { title, imgSource, subtitle, price, ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable {...rest}>
      {() => (
        <View style={[style.container, { borderColor: Colors.outlineborder }]}>
          <Image
            source={imgSource}
            style={[style.image, { backgroundColor: Colors.bgsecondary }]}
          />

          <View style={style.contentWrapper}>
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={14}
              numberOfLines={1}
            >
              {title}
            </Typography>
            <View>
              <Typography
                fontFamily="OpenSans-Regular"
                fontSize={12}
                color="textsecondary"
                numberOfLines={1}
              >
                {subtitle}
              </Typography>
              <Typography
                fontFamily="OpenSans-Semibold"
                fontSize={16}
                numberOfLines={1}
              >
                {price}
              </Typography>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    width: 155,
    height: 225,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 123,
    resizeMode: "cover",
  },
  contentWrapper: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
});
