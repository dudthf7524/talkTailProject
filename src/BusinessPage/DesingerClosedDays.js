import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../BusinessCSS/desingerClosedDays.css'
import { useNavigate } from "react-router-dom";
import { ko } from 'date-fns/locale';
import api from "../Api";

function DesingerClosedDays() {
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
    const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("선택한 날짜:", date); // 여기서 선택한 날짜를 사용할 수 있음
    };

    const writeDesingerClosedDays  = async () => {
        alert(selectedDate)
        
        try{
            const response = await api.post("/business/auth",{selectedDate}, {
                withCredentials: true,
              });
        }catch{
            
        }
      
    }
    
    return (
        <div className="desingerClosedDays">
            <div className='desingerClosedDaysNavigation'>
                <button> 
                    <img src={arrowButtonUrl} alt='' onClick={() => navigate('/business/list/desinger')} />
                </button>
                    휴무일 설정
                <button className="writeDesingerClosedDays" onClick={writeDesingerClosedDays}>
                    등록
                </button>
            </div>

            <div className='title'>
                <div className='text'>날짜 선택</div>
                <div className='text'> <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="클릭"
                    locale={ko}
                />
                 <style>
                {`
                .react-datepicker__triangle {
            display: none;
          }
                `}
                 </style>
                </div>
            </div>

            <div className="horizontal-line"></div>


        </div>
    )
}

export default DesingerClosedDays