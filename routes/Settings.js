import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import SelectItems from "../components/SelectItems";

import { LandscapeContext } from "../context/landscape";
import { StationsContext } from "../context/stations";
import { githubUrl, openURL } from "../lib";

export default function SettingsRoute() {
  const { isTablet } = useContext(LandscapeContext);

  const { availableStations, selectedStationIDs, setselectedStationIDs } =
    useContext(StationsContext);

  return (
    <>
      <View>
        <SelectItems
          items={availableStations}
          max={isTablet ? 6 : 5}
          selected={selectedStationIDs}
          selectionUpdated={(selected) => setselectedStationIDs(selected)}
        />
      </View>
      <View style={styles.donationContainer}>
        <Text style={styles.text}>Entwicklung unterstützen</Text>
        <Button
          color="#2055DA"
          onPress={() => {
            openURL(githubUrl);
          }}
          title="Seite öffnen"
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  donationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#daa520",
    width: "100%",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#fff",
  },
});
