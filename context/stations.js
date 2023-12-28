import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { stationsUrl } from "../lib";

export const StationsContext = React.createContext();

export default function Stations(props) {
  const [selectedStationIDs, setselectedStationIDs] = useState([]);
  const [stations, setstations] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        await AsyncStorage.setItem(
          "selected-stations",
          JSON.stringify(selectedStationIDs)
        );
        await AsyncStorage.setItem("all-stations", JSON.stringify(stations));
      } catch (e) {
        Alert.alert("Fehler", e.message, [{ text: "OK" }], {
          cancelable: false,
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedStationIDs, stations]);

  useEffect(() => {
    async function fn() {
      try {
        const selectedStationsString = await AsyncStorage.getItem(
          "selected-stations"
        );
        if (selectedStationsString !== null) {
          setselectedStationIDs(JSON.parse(selectedStationsString));
        }
        const allStationsString = await AsyncStorage.getItem("all-stations");
        if (allStationsString !== null) {
          setstations(JSON.parse(allStationsString));
        }
      } catch (e) {
        Alert.alert("Fehler", e.message, [{ text: "OK" }], {
          cancelable: false,
        });
      }
    }
    async function fn2() {
      fetch(stationsUrl)
        .then((response) => response.json())
        .then((json) => setstations(json));
    }
    fn();
    fn2();
  }, []);

  return (
    <StationsContext.Provider
      value={{
        selectedStationIDs,
        setselectedStationIDs,
        selectedStations: stations.filter((station) =>
          selectedStationIDs.includes(station.id)
        ),
        availableStations: stations,
      }}
    >
      {props.children}
    </StationsContext.Provider>
  );
}
