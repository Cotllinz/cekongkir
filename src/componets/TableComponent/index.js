import React from "react";
import { Table } from "antd";
import getColumnSearch from "./getColumnSearch";
const TableComponent = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const columns = [
    {
      title: "Nama Ekspedisi",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearch("name", "cari nama"),
    },
    {
      title: "Jangka Waktu",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearch("age", "cari umur"),
    },
    {
      title: "Price",
      dataIndex: "address",
      key: "address",
      ...getColumnSearch("address", "cari alamat"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export { TableComponent };
