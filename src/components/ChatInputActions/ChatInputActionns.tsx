import { ReactElement, memo } from "react";
import * as S from "./ChatInputActions.styles";
import { AudioOutlined, SendOutlined } from "@ant-design/icons/lib/icons";
// @ts-expect-error" @types/navjobs отсутсвует
import { UploadField } from "@navjobs/upload";
import { IChatInputComponent } from "./ChatInputActions.interfaces";

const ChatInputActions = ({
  onSendMessage,
  dialogId,
  value,
  attachments,
  onSelectFiles,
  onRecord,
}: IChatInputComponent): ReactElement => {
  const handleButtonSendMessage = (): void => {
    onSendMessage(value, dialogId, attachments);
  };

  const selectFiles = (files: File): void => {
    onSelectFiles(files);
  };

  return (
    <S.ChatInputActions>
      <S.UploadFiles>
        <UploadField
          onFiles={selectFiles}
          uploadProps={{
            accept: ".jpg,.png,.gif,.jpeg,.bmp",
            multiple: "multiple",
          }}
        >
          <S.CameraOutlinedStyled />
        </UploadField>
      </S.UploadFiles>
      <S.ChatInputSend>
        {value || attachments.length > 0 ? (
          <S.ChatActionButton
            icon={<SendOutlined />}
            onClick={handleButtonSendMessage}
          />
        ) : (
          <S.ChatActionButton onClick={onRecord} icon={<AudioOutlined />} />
        )}
      </S.ChatInputSend>
    </S.ChatInputActions>
  );
};

export default memo(ChatInputActions);
