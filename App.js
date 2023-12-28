import TrackPlayer from "react-native-track-player";
import { NavigationContainer } from "@react-navigation/native";
import Landscape from "./context/landscape";
import HomeRoute from "./routes/Home";
import SettingsRoute from "./routes/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stations from "./context/stations";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";
import { openURL } from "./lib";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    AsyncStorage.getItem("support-shown").then((value) => {
      if (value === null) {
        Alert.alert(
          "Entwicklungsunterstützung",
          "Die Entwicklung dieser App kostet einiges an Zeit. Wenn dir die App gefällt, guck gerne mal bei uns vorbei und schau, ob du uns unterstützen kannst.",
          [
            {
              text: "Seite öffnen",
              onPress: () => {
                AsyncStorage.setItem("support-shown", "true");
                openURL(githubUrl);
              },
            },
            {
              text: "Vielleicht später",
              onPress: () => AsyncStorage.setItem("support-shown", "true"),
            },
          ],
          { cancelable: false }
        );
      }
    });

    AsyncStorage.getItem("popup-shown").then((value) => {
      if (value === null) {
        // AsyncStorage.setItem("info-popup-shown", "true");
        Alert.alert(
          "Wichtig",
          "Um die Einstellungen zu öffnen, muss das Zahnradsysbol in der oberen rechten Ecke für 3 Sekunden gedrückt werden.",
          [
            {
              text: "Schließen",
            },
            {
              text: "Beim nächsten Start nicht mehr anzeigen",
              onPress: () => AsyncStorage.setItem("popup-shown", "true"),
            },
          ],
          { cancelable: false }
        );
      }
    });
  }, []);

  return (
    <Landscape>
      <Stations>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeRoute}
            />
            <Stack.Screen
              name="settings"
              options={{ title: "Sender auswählen" }}
              component={SettingsRoute}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Stations>
    </Landscape>
  );
}
