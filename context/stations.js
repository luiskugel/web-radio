import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { stationsUrl } from "../lib";
import { Alert } from "react-native";

export const StationsContext = React.createContext();

export default function Stations(props) {
  const [selectedStationIDs, setselectedStationIDs] = useState([]);
  const [stations, setstations] = useState([]);
  const [radioStationsURL, setRadioStationsURL] = useState(stationsUrl);

  useEffect(() => {
    AsyncStorage.setItem("radio-stations-url", radioStationsURL).catch((e) => {
      Alert.alert("Fehler", e.message, [{ text: "OK" }], {
        cancelable: false,
      });
    });
  }, [radioStationsURL]);

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
      const url = await AsyncStorage.getItem("radio-stations-url");
      setRadioStationsURL(url || stationsUrl);
      return;
    }

    fn()
      .then(() => fn2())
      .then(() => loadAvailableStations());
  }, []);

  async function loadAvailableStations(url) {
    if (!url) url = radioStationsURL;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setstations(json))
      .catch((e) => {
        Alert.alert("Fehler", e.message, [{ text: "OK" }], {
          cancelable: false,
        });
      });
  }

  return (
    <StationsContext.Provider
      value={{
        selectedStationIDs,
        setselectedStationIDs,
        selectedStations: stations.filter((station) =>
          selectedStationIDs.includes(station.id)
        ),
        availableStations: stations,
        setRadioStationsURL: (url) => {
          setstations([]);
          setselectedStationIDs([]);
          setRadioStationsURL(url);
          loadAvailableStations(url);
        },
        radioStationsURL,
      }}
    >
      {props.children}
    </StationsContext.Provider>
  );
}
