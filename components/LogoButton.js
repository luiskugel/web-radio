import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function LogoButton(props) {
  const handlePress = () => {
    props.onPress(props.station.id);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        {props.station.icon ? (
          <Image
            source={{
              uri: props.station.icon,
            }}
            style={props.playing ? styles.imageLarge : styles.imageSmall}
          />
        ) : (
          <Text
            style={{
              ...(props.playing ? styles.textLarge : styles.textSmall),
              color: props.station.textColor ?? "#000",
            }}
          >
            {props.station.name}
          </Text>
        )}
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
  textSmall: {
    fontSize: 50,
    fontWeight: "bold",
  },
  textLarge: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
});
