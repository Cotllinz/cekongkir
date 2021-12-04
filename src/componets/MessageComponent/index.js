import { notification } from "antd";

const openNotification = ({ type, description, message }) => {
  type === "success"
    ? notification.success({
        message,
        description,
      })
    : notification.error({
        message,
        description,
      });
};

export { openNotification };
