import { createSlice } from '@reduxjs/toolkit';


const reservationDataSlice = createSlice({
    name: 'reservationData',
    initialState: {
        designerName: null, // 디자이너 이름을 저장할 상태
        monthAndDay: null,  // 예약 날짜를 저장할 상태
        time: null,         // 예약 시간을 저장할 상태
    },
    reducers: {
        setDesignerName: (state, action) => {
            state.designerName = action.payload; // 디자이너 이름 업데이트
        },
        setMonthAndDay: (state, action) => {
            state.monthAndDay = action.payload; // 디자이너 이름 업데이트
        },
        setTime: (state, action) => {
            state.time = action.payload; // 디자이너 이름 업데이트
        },
    },
});

export const { setDesignerName, setMonthAndDay, setTime } = reservationDataSlice.actions;
export default reservationDataSlice.reducer;