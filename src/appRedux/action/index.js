import {
  SET_PROVINSI,
  SET_KOTA_ASAL,
  SET_KOTA_TUJUAN,
  SET_ONGKIR,
  SET_LOADING,
  SET_MESSAGE,
} from "../types";
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
      dispatch(
        setMessage({
          message: "Gagal Ditemukan",
          description: "Cek API / Koneksi :)",
          type: "error",
        })
      );
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
      dispatch(
        setMessage({
          message: "Gagal Ditemukan",
          description: "Cek API / Koneksi :)",
          type: "error",
        })
      );
    }
  };
};
export const setOngkir = (payload) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const { origin, destination, weight, courier } = payload;
    try {
      const { data } = await axios.get(
        `/api/ongkos/${origin}/${destination}/${weight}/${courier}`,
        {
          headers: {
            key: "07cc1f94b76744d8c9ed80331542808b",
          },
        }
      );
      dispatch(
        setMessage({
          message: "Berhasil Ditemukan",
          description: "Cek Ongkir Kamu :)",
          type: "success",
        })
      );
      dispatch(setOngkirPerbarang(data.rajaongkir));
    } catch (error) {
      dispatch(
        setMessage({
          message: "Gagal Ditemukan",
          description: "Cek API / Koneksi :)",
          type: "error",
        })
      );
    } finally {
      dispatch(setLoading(false));
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
      dispatch(
        setMessage({
          message: "Gagal Ditemukan",
          description: "Cek API / Koneksi :)",
          type: "error",
        })
      );
    }
  };
};

export const setKotaTujuan = (payload) => {
  return {
    type: SET_KOTA_TUJUAN,
    payload,
  };
};
export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};
export const setMessage = (payload) => {
  return {
    type: SET_MESSAGE,
    payload,
  };
};
export const setOngkirPerbarang = (payload) => {
  return {
    type: SET_ONGKIR,
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
