import { useContext, useEffect, useState } from "react";
import TrackPlayer, { Capability, Event } from "react-native-track-player";
import { AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import LogoButton from "../components/LogoButton";
import { LandscapeContext } from "../context/landscape";

import TimeoutButton from "../components/TimeoutButton";
import { StationsContext } from "../context/stations";

export default function HomeRoute({ navigation }) {
  const [currentStream, setCurrentStream] = useState(null);

  const { isLandscape } = useContext(LandscapeContext);
  const { selectedStations } = useContext(StationsContext);

  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.Skip,
        ],
      });
      TrackPlayer.registerPlaybackService(() => require("../service"));
      const sub = AppState.addEventListener("change", (nextAppState) => {
        if (nextAppState === "active") {
          TrackPlayer.getPlaybackState().then((state) => {
            if (state.state === "stopped") {
              setCurrentStream(undefined);
            } else {
              TrackPlayer.getActiveTrack().then((track) => {
                setCurrentStream(track.id);
              });
            }
          });
        }
      });

      return () => {
        AppState.removeEventListener(sub);
      };
    }

    setupPlayer();
  }, []);

  const handlePress = async (id) => {
    if (currentStream === id) {
      await TrackPlayer.stop();
      setCurrentStream(undefined);
      return;
    }

    await TrackPlayer.reset();

    setCurrentStream(id);

    const station = selectedStations.find((station) => station.id === id);
    if (!station) console.log("Station not found");

    await TrackPlayer.add([
      {
        id: station.id,
        url: station.url,
        title: station.name,
        artist: "radio",
        artwork: station.icon,
      },
    ]);

    await TrackPlayer.play();
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={[
          styles.container,
          isLandscape ? styles.containerLandscape : styles.containerPortrait,
        ]}
      >
        <View style={styles.settingsContainer}>
          <TimeoutButton
            handlePress={() => navigation.navigate("settings")}
          ></TimeoutButton>
        </View>
        {selectedStations.length > 0 ? (
          selectedStations.map((station) => {
            return (
              <LogoButton
                key={station.id}
                station={station}
                playing={currentStream === station.id}
                onPress={handlePress}
              ></LogoButton>
            );
          })
        ) : (
          <Text>Keine Radiosender ausgewählt</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  settingsContainer: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 1,
  },
  containerPortrait: {
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
  },
  containerLandscape: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainContainer: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    flex: 1,
  },
});
