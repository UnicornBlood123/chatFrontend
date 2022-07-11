import styled from "styled-components";
import { Modal, Upload } from "antd";

export const UploadStyled = styled(Upload)`
  padding-left: 54px;
  .ant-upload-list-item {
    border: 0;
    height: 100%;
    padding: 0;
  }
  .ant-upload-list-picture-card-container {
    width: 78px;
    height: 78px;
  }
  .ant-upload-list-item-thumbnail {
    line-height: 78px;
  }
`;

export const ModalStyled = styled(Modal)`
  position: unset;
  padding: 0;
  img {
    width: 100%;
  }
`;
