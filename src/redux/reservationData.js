import { createSlice } from '@reduxjs/toolkit';


const reservationDataSlice = createSlice({
    name: 'reservationData',
    initialState: {
        designerName: null, // 디자이너 이름을 저장할 상태
        monthAndDay: null,  // 예약 날짜를 저장할 상태
        time: null,        // 예약 시간을 저장할 상태
        petId: null,     // 예약 펫 id를 저장할 상태
        businessInfo: {         // 미용가게 정보 (객체 형태)
            business_name: null,         // 가게 이름
            business_registration_number: null, // 사업자 번호
            business_no_show: null,     // 노쇼 방지 금액
        },
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
        setPetId: (state, action) => {
            state.petId = action.payload; // 디자이너 이름 업데이트
        },
        setBusinessInfo: (state, action) => {
            state.businessInfo = { ...state.businessInfo, ...action.payload }; 
            // 기존 businessInfo 상태에 새로운 값 병합
        },
    },
});

export const { setDesignerName, setMonthAndDay, setTime, setPetId, setBusinessInfo } = reservationDataSlice.actions;
export default reservationDataSlice.reducer;