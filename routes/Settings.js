import React, { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SelectItems from "../components/SelectItems";

import { LandscapeContext } from "../context/landscape";
import { StationsContext } from "../context/stations";
import { githubUrl, openURL } from "../lib";

export default function SettingsRoute() {
  const { isTablet } = useContext(LandscapeContext);

  const {
    availableStations,
    selectedStationIDs,
    setselectedStationIDs,
    radioStationsURL,
    setRadioStationsURL,
  } = useContext(StationsContext);

  const [newRadioStationsURL, setNewRadioStationsURL] =
    useState(radioStationsURL);
  return (
    <>
      <View>
        <Text style={styles.smallText}>Senderliste</Text>
        <View style={styles.stationsURLContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNewRadioStationsURL(text)}
            value={newRadioStationsURL}
          />
          <TouchableOpacity
            style={{
              borderColor: "#000",
              padding: 5,
              borderWidth: 1,
              marginBottom: "auto",
              height: 40,
            }}
            onPress={() => {
              setRadioStationsURL(newRadioStationsURL);
            }}
          >
            <Text
              style={{
                padding: 5,
                height: 40,
              }}
            >
              Laden
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  stationsURLContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    top: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#fff",
  },
  smallText: {
    fontSize: 16,
    marginLeft: 12,
    marginTop: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 0,
    marginRight: 4,
    width: "75%",
  },
});
