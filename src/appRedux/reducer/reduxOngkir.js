import {
  SET_PROVINSI,
  SET_KOTA_ASAL,
  SET_KOTA_TUJUAN,
  SET_ONGKIR,
} from "../types";
const inititalState = {
  provinsi: [],
  kotaAsal: [],
  kotaTujuan: [],
  ongkir: [],
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
    default:
      return state;
  }
};
export default reduxOngkir;
