import { Form, Button, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  NavigationBar,
  SelectedComponent,
  TableComponent,
} from "../../componets";
import { getProvinci, setCityAsal, setCityTujuan } from "../../appRedux/action";
import { useDispatch, useSelector } from "react-redux";

const HomePage = (props) => {
  const Provinci = useSelector(({ reduxOngkir }) => reduxOngkir.provinsi);
  const kotaAsal = useSelector(({ reduxOngkir }) => reduxOngkir.kotaAsal);
  const kotaTujuan = useSelector(({ reduxOngkir }) => reduxOngkir.kotaTujuan);
  const dispatch = useDispatch();

  const [idProvinciAsal, setIDProvinciAsal] = useState();
  const [kotaAsalValue, setKotaAsalValue] = useState();
  const [idProvinciTujuan, setIDProvinciTujuan] = useState();
  const [kotaTujuanValue, setKotaTujuanValue] = useState();
  const [DisplayAsal, setDisplayAsal] = useState(true);
  const [DisplayTujuan, setDisplayTujuan] = useState(true);
  const [kurir, setKurir] = useState();
  const [weight, setWeight] = useState(0);
  useEffect(() => {
    dispatch(getProvinci());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setKotaAsalValue();
    if (idProvinciAsal) {
      setDisplayAsal(false);
      dispatch(setCityAsal(idProvinciAsal));
    }
    // eslint-disable-next-line
  }, [idProvinciAsal]);
  useEffect(() => {
    setKotaTujuanValue();
    if (idProvinciTujuan) {
      setDisplayTujuan(false);
      dispatch(setCityTujuan(idProvinciTujuan));
    }
    // eslint-disable-next-line
  }, [idProvinciTujuan]);
  const OptionKurir = ["jne", "post", "tiki"];
  const searchOngkir = (e) => {
    e.preventDefault();
    const payload = {
      origin: kotaAsalValue,
      destination: kotaTujuanValue,
      weight,
      courier: kurir,
    };

    console.log(payload);
  };
  const SelectedComponentNeeded = [
    {
      labelName: "Pilih Provinsi Asal",
      selectedSetup: {
        placeHolder: "Cari Provinsimu Asalmu",
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
        display: DisplayAsal,
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
        display: DisplayTujuan,
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
            <TableComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const WrappedHomePage = Form.create()(HomePage);
export default WrappedHomePage;
