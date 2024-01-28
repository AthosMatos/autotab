import { ComponentViewProvider } from "./ComponentView";
import { NotesFretViewProvider } from "./NotesFretView/useTabViewContext";
import { PlaybackProvider } from "./Playback/usePlaybackContext";
import { MediaRecoderProvider } from "./Recorder/useMediaRecorder";
import { TabProvider } from "./Tab";

import { WebsocketProvider } from "./WebSocket";

export const contextsList = [
  WebsocketProvider,
  NotesFretViewProvider,
  PlaybackProvider,
  MediaRecoderProvider,
  ComponentViewProvider,
  TabProvider
];
