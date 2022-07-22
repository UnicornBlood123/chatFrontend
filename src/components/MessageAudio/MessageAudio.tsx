import { ReactElement, useEffect, useRef, useState } from "react";
import * as S from "./MessageAudio.styles";
import waveSvg from "../../assets/img/Wave.svg";
import playSvg from "../../assets/img/Play.svg";
import pauseSvg from "../../assets/img/Pause.svg";
import convertCurrentTime from "../../utils/convertCurrentTime";
import { IMessageAudioComponent } from "./MessageAudio.interfaces";

const MessageAudio = ({ audio }: IMessageAudioComponent): ReactElement => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (): void => {
    if (!isPlay) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener(
      "playing",
      () => {
        setIsPlay(true);
      },
      false
    );
    audioRef.current?.addEventListener(
      "ended",
      () => {
        setIsPlay(false);
        setProgress(0);
        setCurrentTime(0);
      },
      false
    );
    audioRef.current?.addEventListener(
      "pause",
      () => {
        setIsPlay(false);
      },
      false
    );
    audioRef.current?.addEventListener(
      "timeupdate",
      () => {
        const duration = audioRef?.current?.duration ?? 0;
        setCurrentTime(audioRef.current?.currentTime ?? 0);
        setProgress(((audioRef.current?.currentTime ?? 0) / duration) * 100);
      },
      false
    );
  }, []);

  return (
    <S.MessageAudio>
      <audio ref={audioRef} src={audio} preload="auto" />
      <S.MessageAudioProgress progress={progress} />
      <S.MessageAudioInfo>
        <S.MessageAudioButton>
          <button onClick={togglePlay}>
            {<img src={isPlay ? pauseSvg : playSvg} alt="Play svg" />}
          </button>
        </S.MessageAudioButton>
        <S.MessageAudioWave>
          <img src={waveSvg} alt="Wave svg" />
        </S.MessageAudioWave>
        <S.MessageAudioDuration>
          {convertCurrentTime(currentTime)}
        </S.MessageAudioDuration>
      </S.MessageAudioInfo>
    </S.MessageAudio>
  );
};

export default MessageAudio;
