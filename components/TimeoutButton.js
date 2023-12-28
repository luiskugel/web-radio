import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TimeoutButton({ handlePress }) {
  const [settingsPressedTimeout, setsettingsPressedTimeout] =
    useState(undefined);
  const [settingsPressedSeconds, setsettingsPressedSeconds] = useState(0);

  useEffect(() => {
    if (settingsPressedSeconds >= 1) {
      handlePress();
      setsettingsPressedSeconds(0);
    }
  }, [settingsPressedSeconds]);

  return (
    <TouchableOpacity
      onPressIn={() =>
        setsettingsPressedTimeout(
          setInterval(() => {
            setsettingsPressedSeconds((seconds) => seconds + 1);
          }, 1000)
        )
      }
      onPressOut={() => {
        clearInterval(settingsPressedTimeout);
        setsettingsPressedSeconds(0);
      }}
    >
      <Ionicons name="settings" size={24} color="black" />
    </TouchableOpacity>
  );
}
