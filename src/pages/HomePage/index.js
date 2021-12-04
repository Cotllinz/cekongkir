import {
  Form,
  Button,
  InputNumber,
  Descriptions,
  Skeleton,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  NavigationBar,
  SelectedComponent,
  TableComponent,
  openNotification,
} from "../../componets";
import {
  getProvinci,
  setCityAsal,
  setCityTujuan,
  setOngkir,
  setKotaTujuan,
  setKotaAsal,
  setMessage,
} from "../../appRedux/action";
import { useDispatch, useSelector } from "react-redux";

const HomePage = (props) => {
  const Provinci = useSelector(({ reduxOngkir }) => reduxOngkir.provinsi);
  const kotaAsal = useSelector(({ reduxOngkir }) => reduxOngkir.kotaAsal);
  const kotaTujuan = useSelector(({ reduxOngkir }) => reduxOngkir.kotaTujuan);
  const ongkirResult = useSelector(({ reduxOngkir }) => reduxOngkir.ongkir);
  const loading = useSelector(({ reduxOngkir }) => reduxOngkir.loading);
  const dispatch = useDispatch();
  const messages = useSelector(({ reduxOngkir }) => reduxOngkir.messages);
  const [idProvinciAsal, setIDProvinciAsal] = useState();
  const [kotaAsalValue, setKotaAsalValue] = useState();
  const [idProvinciTujuan, setIDProvinciTujuan] = useState();
  const [kotaTujuanValue, setKotaTujuanValue] = useState();
  const [display, setDisplay] = useState(false);
  const [kurir, setKurir] = useState();
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    dispatch(getProvinci());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setKotaAsalValue();
    setDisplay(false);
    dispatch(setKotaAsal([]));
    if (idProvinciAsal) {
      dispatch(setCityAsal(idProvinciAsal));
    }
    // eslint-disable-next-line
  }, [idProvinciAsal]);
  useEffect(() => {
    setKotaTujuanValue();
    setDisplay(false);
    dispatch(setKotaTujuan([]));
    if (idProvinciTujuan) {
      dispatch(setCityTujuan(idProvinciTujuan));
    }
    // eslint-disable-next-line
  }, [idProvinciTujuan]);

  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      openNotification({
        type: messages.type,
        description: messages.description,
        message: messages.message,
      });
      dispatch(setMessage({}));
    }
    // eslint-disable-next-line
  }, [messages]);
  let key = "updatable";
  const OptionKurir = ["jne", "pos", "tiki"];
  const searchOngkir = (e) => {
    e.preventDefault();
    const payload = {
      origin: kotaAsalValue,
      destination: kotaTujuanValue,
      weight,
      courier: kurir,
    };
    if (
      payload.origin &&
      payload.destination &&
      payload.weight &&
      payload.courier
    ) {
      dispatch(setOngkir(payload));
      message.loading({ content: "Tunggu Sebentar...", key });
      setDisplay(true);
    } else {
      message.error("Input Semua Data  Terlebih Dahulu !!");
    }
  };
  const SelectedComponentNeeded = [
    {
      labelName: "Pilih Provinsi Asal",
      selectedSetup: {
        placeHolder: "Cari Provinsi Asalmu",
        dataArray: Provinci,
        value: idProvinciAsal,
        setValue: setIDProvinciAsal,
        arrayCase: "provinci",
      },
    },
    {
      labelName: "Pilih Kota Asal",
      selectedSetup: {
        placeHolder: "Pilih Kota Asalmu",
        dataArray: kotaAsal,
        display: idProvinciAsal ? false : true,
        value: kotaAsalValue,
        setValue: setKotaAsalValue,
        arrayCase: "Kota",
      },
    },
    {
      labelName: "Pilih Provinsi Tujuan",
      selectedSetup: {
        placeHolder: "Cari Provinsi Tujuanmu",
        dataArray: Provinci,
        value: idProvinciTujuan,
        setValue: setIDProvinciTujuan,
        arrayCase: "provinci",
      },
    },
    {
      labelName: "Pilih Kota Tujuan",
      selectedSetup: {
        placeHolder: "Pilih Kota tujuanmu",
        dataArray: kotaTujuan,
        display: idProvinciTujuan ? false : true,
        value: kotaTujuanValue,
        setValue: setKotaTujuanValue,
        arrayCase: "Kota",
      },
    },
    {
      labelName: "Pilih Kurir Favoritmu",
      selectedSetup: {
        placeHolder: "Pilih Kurir",
        dataArray: OptionKurir,
        value: kurir,
        setValue: setKurir,
        arrayCase: "Kurir",
      },
    },
  ];
  return (
    <div>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12}>
            <Form layout={"vertical"} onSubmit={searchOngkir}>
              {SelectedComponentNeeded.map((items, index) => {
                return (
                  <>
                    {!items.selectedSetup.display ? (
                      <Form.Item key={index} label={items.labelName}>
                        <SelectedComponent
                          PlaceHolder={items.selectedSetup.placeHolder}
                          arrayData={items.selectedSetup.dataArray || []}
                          value={items.selectedSetup.value}
                          disabled={items.selectedSetup.disabled || false}
                          setValue={items.selectedSetup.setValue}
                          arrayCase={items.selectedSetup.arrayCase}
                        />
                      </Form.Item>
                    ) : null}
                  </>
                );
              })}
              <Form.Item key={"beratBarang"} label="Berat Barang">
                <InputNumber
                  defaultValue={weight}
                  formatter={(value) => `${value}Kg`}
                  parser={(value) => value.replace("Kg", "")}
                  onChange={(e) => setWeight(e)}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  marginTop: 10,
                  height: 40,
                }}
                size="default"
              >
                Cek Ongkir
              </Button>
            </Form>
          </Col>
          <Col className="mt-4">
            {display ? (
              <>
                {!loading && message.destroy(key)}
                <Skeleton avatar loading={loading} paragraph={{ rows: 7 }}>
                  <Descriptions title="Ongkir Info" layout="vertical" bordered>
                    <Descriptions.Item label="Provinsi Asal">
                      {ongkirResult?.origin_details?.province}
                    </Descriptions.Item>
                    <Descriptions.Item label="Kota Asal">
                      {ongkirResult?.origin_details?.city_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Kurir">
                      {ongkirResult?.query?.courier?.toUpperCase()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Provinsi Tujuan">
                      {ongkirResult?.destination_details?.province}
                    </Descriptions.Item>
                    <Descriptions.Item label="Kota Tujuan">
                      {ongkirResult?.destination_details?.city_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Berat Barang">
                      {ongkirResult?.query &&
                        `${ongkirResult?.query?.weight} Kg`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ongkir Description" span={3}>
                      <TableComponent
                        dataTable={
                          ongkirResult.results
                            ? [
                                {
                                  cost: ongkirResult?.results[0]?.costs,
                                  weight: ongkirResult?.query?.weight,
                                },
                              ]
                            : []
                        }
                      />
                    </Descriptions.Item>
                  </Descriptions>
                </Skeleton>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const WrappedHomePage = Form.create()(HomePage);
export default WrappedHomePage;
