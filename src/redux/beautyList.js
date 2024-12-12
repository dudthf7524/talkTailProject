// src/redux/beautyList.js (id를 사용하지 않도록 변경)
import api from '../Api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 비동기 API 호출을 위한 createAsyncThunk
export const fetchBeautyList = createAsyncThunk(
  'beautyList/fetchBeautyList',
  async (_, { rejectWithValue }) => {  // 이제 id는 필요 없으므로 매개변수에서 제거
    try {
        const response = await api.get('/api/businesses/information', {  // 엔드포인트에서 ${id} 제거
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                        console.log("redux data")
        console.log(response.data)
      return response.data; // 성공하면 데이터를 반환
    } catch (error) {
      console.error("API 요청 실패", error);
      return rejectWithValue(error.response.data); // 실패하면 에러 반환
    }
  }
);

// 슬라이스 생성
const beautyList = createSlice({
  name: 'beautyList',
  initialState: {
    beautyListData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeautyList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBeautyList.fulfilled, (state, action) => {
        state.loading = false;
        state.beautyListData = action.payload;
      })
      .addCase(fetchBeautyList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default beautyList.reducer;
