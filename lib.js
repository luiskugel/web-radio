import { Linking } from "react-native";

export const openURL = (url) => {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

export const stationsUrl =
  "https://raw.githubusercontent.com/der-grosse/radio-link-list/master/stations.json";
export const githubUrl = "https://github.com/luiskugel/web-radio-app/";
