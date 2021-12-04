import React from "react";
import { Select } from "antd";
import "./index.css";
const { Option } = Select;

function SelectedComponent(props) {
  const { PlaceHolder, arrayData, arrayCase, setValue, value } = props;

  return (
    <Select
      showSearch
      className="selectOption"
      value={value}
      placeholder={PlaceHolder || "Masukan Inputanmu"}
      optionFilterProp="children"
      onChange={(e) => setValue(e)}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {arrayData?.map((items, index) => {
        if (arrayCase === "provinci") {
          return (
            <Option key={index} value={items.province_id}>
              {items.province}
            </Option>
          );
        } else if (arrayCase === "Kota") {
          return (
            <Option key={index} value={items.city_id}>
              {items.city_name}
            </Option>
          );
        } else {
          return (
            <Option key={index} value={items}>
              {items.toUpperCase()}
            </Option>
          );
        }
      })}
    </Select>
  );
}

export { SelectedComponent };
