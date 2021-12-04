import React from "react";
import { Table } from "antd";
import getColumnSearch from "./getColumnSearch";

const TableComponent = (props) => {
  const { dataTable } = props;

  const columns = [
    {
      title: "Nama Service",
      dataIndex: "service",
      key: "service",

      ...getColumnSearch("service", "cari nama"),
      render: (text, source) => {
        return `${source.service} (${source.description})`;
      },
    },
    {
      title: "Jangka Waktu",
      dataIndex: "cost",
      key: "cost",
      render: (text, source) => {
        return (
          <>
            {source?.cost.map((items) => {
              if (items.etd.toLowerCase().includes("hari")) {
                return `${items.etd.toLowerCase()}`;
              } else {
                return `${items.etd} hari`;
              }
            })}
          </>
        );
      },
    },
    {
      title: "Harga",
      dataIndex: "cost",
      key: "cost",
      render: (text, source) => {
        return (
          <>
            {source?.cost.map((items) => {
              return `Rp. ${dataTable[0]?.weight * items.value}`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
            })}
          </>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={dataTable[0]?.cost} />;
};

export { TableComponent };
