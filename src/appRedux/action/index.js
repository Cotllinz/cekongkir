import { SET_PROVINSI, SET_KOTA_ASAL, SET_KOTA_TUJUAN } from "../types";
import axios from "axios";

export const getProvinci = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/provinsi`, {
        headers: {
          key: "07cc1f94b76744d8c9ed80331542808b",
        },
      });
      dispatch(setProvinsi(data.rajaongkir.results));
    } catch (error) {
      console.log({ error });
    }
  };
};
export const setCityAsal = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/kota/${id}`, {
        headers: {
          key: "07cc1f94b76744d8c9ed80331542808b",
        },
      });

      dispatch(setKotaAsal(data.rajaongkir.results));
    } catch (error) {
      console.log({ error });
    }
  };
};

export const setCityTujuan = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/kota/${id}`, {
        headers: {
          key: "07cc1f94b76744d8c9ed80331542808b",
        },
      });
      dispatch(setKotaTujuan(data.rajaongkir.results));
    } catch (error) {
      console.log({ error });
    }
  };
};

export const setKotaTujuan = (payload) => {
  return {
    type: SET_KOTA_TUJUAN,
    payload,
  };
};
export const setProvinsi = (payload) => {
  return {
    type: SET_PROVINSI,
    payload,
  };
};
export const setKotaAsal = (payload) => {
  return {
    type: SET_KOTA_ASAL,
    payload,
  };
};
