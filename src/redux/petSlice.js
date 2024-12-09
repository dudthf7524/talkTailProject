// src/redux/petSlice.js
import api from '../Api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 API 호출을 위한 createAsyncThunk
export const fetchPetData = createAsyncThunk(
  'pets/fetchPetData',
  async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/pet/detail/${id}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
      return response.data; // 성공하면 데이터를 반환
    } catch (error) {
      return rejectWithValue(error.response.data); // 실패하면 에러 반환
    }
  }
);

// 슬라이스 생성
const petSlice = createSlice({
  name: 'pets',
  initialState: {
    petData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPetData.fulfilled, (state, action) => {
        state.loading = false;
        state.petData = action.payload; // API로부터 받은 데이터를 저장
      })
      .addCase(fetchPetData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // 에러 처리
      });
  },
});

export default petSlice.reducer;
