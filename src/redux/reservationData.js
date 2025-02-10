import { createSlice } from '@reduxjs/toolkit';


const reservationDataSlice = createSlice({
    name: 'reservationData',
    initialState: {
        designerName: null, // 디자이너 이름을 저장할 상태
        date: null,  // 예약 희망시간을 저장할 상태
        startTime: null,
        petId: null,     // 예약 펫 id를 저장할 상태
        hour: null,
        acceptTime : null,
        acceptOldTime : '0',
        businessInfo: {         // 미용가게 정보 (객체 형태)
            business_name: null,         // 가게 이름
            business_registration_number: null, // 사업자 번호
            business_no_show: null,     // 노쇼 방지 금액
            business_owner_phone: null,
        },
    },
    reducers: {
        setDesignerName: (state, action) => {
            state.designerName = action.payload; // 디자이너 이름 업데이트
        },
        setDate: (state, action) => {
            state.date = action.payload; // 디자이너 이름 업데이트
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload; // 디자이너 이름 업데이트
        },
        setPetId: (state, action) => {
            state.petId = action.payload; // 디자이너 이름 업데이트
        },
        setHour: (state, action) => {
            state.hour = action.payload; // 디자이너 이름 업데이트
        },
        setAcceptTime: (state, action) => {
            state.acceptTime = action.payload; // 디자이너 이름 업데이트
        },
        setAcceptOldTime: (state, action) => {
            state.acceptOldTime = action.payload; // 디자이너 이름 업데이트
        },
        setBusinessInfo: (state, action) => {
            state.businessInfo = { ...state.businessInfo, ...action.payload };
            // 기존 businessInfo 상태에 새로운 값 병합
        },
    },
});

export const { setDesignerName, setDate, setStartTime, setPetId, setHour,setAcceptTime, setAcceptOldTime, setBusinessInfo} = reservationDataSlice.actions;
export default reservationDataSlice.reducer;