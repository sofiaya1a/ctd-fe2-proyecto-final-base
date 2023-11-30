import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../app/store';
import { ESTADO_FETCH } from '../utils/constants';
import { obtenerCita } from '../api/citaAPI';
import { ICita } from '../types/types';

export interface EstadoCita {
  data: ICita | null;
  estado: ESTADO_FETCH;
}

const initialState: EstadoCita = {
  data: null,
  estado: ESTADO_FETCH.INACTIVO,
};

export const obtenerCitaAsync = createAsyncThunk('cita/obtenerCita', async (personaje: string) => {
  const cita = await obtenerCita(personaje);
  return cita;
});

export const citaSlice = createSlice({
  name: 'citas',
  initialState,
  reducers: {
    limpiar: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(obtenerCitaAsync.pending, (state) => {
        state.estado = ESTADO_FETCH.CARGANDO;
      })
      .addCase(obtenerCitaAsync.fulfilled, (state, action) => {
        state.estado = ESTADO_FETCH.INACTIVO;
        state.data = action.payload;
      })
      .addCase(obtenerCitaAsync.rejected, (state) => {
        state.estado = ESTADO_FETCH.ERROR;
      });
  },
});

export const { limpiar } = citaSlice.actions;

export const obtenerCitaDeLaAPI = (personaje: string) => (dispatch: AppDispatch) => {
  dispatch(limpiar());
  dispatch(obtenerCitaAsync(personaje));
};

export const obtenerCitaDelEstado = (state: RootState) => state.cita.data;
export const obtenerEstadoDelPedido = (state: RootState) => state.cita.estado;

export default citaSlice.reducer;
