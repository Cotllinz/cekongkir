import {
  SET_PROVINSI,
  SET_KOTA_ASAL,
  SET_KOTA_TUJUAN,
  SET_ONGKIR,
  SET_LOADING,
  SET_MESSAGE,
} from "../types";
const inititalState = {
  provinsi: [],
  kotaAsal: [],
  kotaTujuan: [],
  ongkir: {},
  loading: false,
  messages: {},
};
const reduxOngkir = (state = inititalState, action) => {
  switch (action.type) {
    case SET_PROVINSI:
      return { ...state, provinsi: action.payload };
    case SET_KOTA_ASAL:
      return { ...state, kotaAsal: action.payload };
    case SET_KOTA_TUJUAN:
      return { ...state, kotaTujuan: action.payload };
    case SET_ONGKIR:
      return { ...state, ongkir: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_MESSAGE:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
export default reduxOngkir;
