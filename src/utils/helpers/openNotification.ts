import { notification } from "antd";

interface Interface {
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
}: Interface) => {
  (notification as any)[type]({
    message: title,
    description: text,
    duration: duration,
  });
};

export default openNotificationWithIcon;
