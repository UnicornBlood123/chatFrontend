import { notification } from "antd";
import { IconType } from "antd/es/notification";

interface INotification {
  text: string;
  type: string;
  title: string;
  duration?: number;
}

const openNotificationWithIcon = ({
  text,
  type = "info",
  title,
  duration = 3,
}: INotification): void => {
  notification[type as IconType]({
    message: title,
    description: text,
    duration: duration,
  });
};

export default openNotificationWithIcon;
