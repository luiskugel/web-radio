import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function LogoButton(props) {
  const handlePress = () => {
    props.onPress(props.station.id);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        {
          <Image
            source={{
              uri: props.station.icon,
            }}
            style={props.playing ? styles.imageLarge : styles.imageSmall}
          />
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 380,
    height: 250,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
  },
  imageSmall: {
    width: 200,
    height: 140,
    resizeMode: "contain",
    justifyContent: "center",
  },
  imageLarge: {
    width: 380,
    height: 250,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
