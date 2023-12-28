const { default: TrackPlayer, Event } = require("react-native-track-player");

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.stop());

  TrackPlayer.addEventListener("playback-state", () => {});
};
