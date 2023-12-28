import * as ScreenOrientation from "expo-screen-orientation";
import * as Device from "expo-device";

export const LandscapeContext = React.createContext();

import React, { useEffect, useState } from "react";

export default function Landscape(props) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const setDecodeOrientation = (orientation) => {
    if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  };
  useEffect(() => {
    async function fn() {
      if (Device.isDevice && Platform.OS === "ios") {
        const deviceType = await Device.getDeviceTypeAsync();
        if (deviceType === Device.DeviceType.PHONE) {
          // Lock the orientation on iPhone
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          );
        } else {
          // Allow all orientations on iPad
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.ALL
          );
          const orientation = await ScreenOrientation.getOrientationAsync();
          setIsTablet(true);
          setDecodeOrientation(orientation);
        }
      }
    }
    fn();
  });

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        const { orientationInfo } = event;
        setDecodeOrientation(orientationInfo.orientation);
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <LandscapeContext.Provider value={{ isLandscape, isTablet }}>
      {props.children}
    </LandscapeContext.Provider>
  );
}
