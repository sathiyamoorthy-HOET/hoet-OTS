import "./index.css";
import { Composition } from "remotion";
import { FileNamingVideo } from "./Composition";
import { IconsVideo } from "./IconsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FileNaming"
        component={FileNamingVideo}
        durationInFrames={510}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="IconsGuide"
        component={IconsVideo}
        durationInFrames={510}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
