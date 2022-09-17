import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import * as S from "./UploadFiles.styles";
import { ReactElement, useEffect, useState } from "react";
import { IUploadFilesComponent } from "./UploadFiles.interfaces";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result as string);
    reader.onerror = (error): void => reject(error);
  });

const UploadFiles = ({
  attachments,
  setAttachments,
}: IUploadFilesComponent): ReactElement => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");

  useEffect(() => {
    console.log("2");
  });

  const handleCancel = (): void => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      await getBase64(file.originFileObj as RcFile).then((preview) => {
        console.log(preview);
        file.preview = preview;
      });
    }

    setPreviewImage(file?.url ?? (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setAttachments(newFileList as any);
  };

  return (
    <>
      <S.UploadStyled
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={attachments as any}
        onPreview={handlePreview}
        onChange={handleChange}
      />
      <S.ModalStyled
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" src={previewImage} />
      </S.ModalStyled>
    </>
  );
};

export default UploadFiles;
