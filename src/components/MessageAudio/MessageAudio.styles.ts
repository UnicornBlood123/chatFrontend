import styled from "styled-components";

export const MessageAudio = styled.div`
  audio {
    display: none;
  }
`;

export const MessageAudioProgress = styled.div<{ progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  background: ${({ theme: { colors } }) => colors.progress_audio_color};
  width: ${(props) => props.progress}%;
  height: 100%;
  transition: width 0.3s ease;
`;

export const MessageAudioInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessageAudioButton = styled.div`
  button {
    cursor: pointer;
    width: 28px;
    height: 28px;
    border-radius: 30px;
    background: ${({ theme: { colors } }) => colors.purple};
    border: 0;
    img {
      height: 15px;
    }
  }
`;

export const MessageAudioDuration = styled.span`
  font-size: 12px;
  opacity: 0.5;
  font-weight: 500;
  color: ${({ theme: { colors } }) => colors.white};
`;

export const MessageAudioWave = styled.div``;
