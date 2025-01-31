import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../BusinessCSS/desingerClosedDays.css'
import { useLocation, useNavigate } from "react-router-dom";
import { ko } from 'date-fns/locale';
import api from "../Api";

function DesingerClosedDays() {
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
    const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const location = useLocation();
    const id = location.state?.id; // state로 받은 값
    const [lists, setLists] = useState([]);


    useEffect(() => {
        console.log(id)
        const list = async () => {
            try {
                const response = await api.get(`/api/desinger/day/list/${id}`, { id: id }, { withCredentials: true });
                setLists(response.data);
                console.log(response.data)

            } catch (e) {
                console.error('휴무일 리스트 오류:', e);
            }
        };
        list();
    }, []);

    const handleDateChange = (date) => {

        setSelectedDate(date);
        console.log("선택한 날짜:", date); // 여기서 선택한 날짜를 사용할 수 있음
    };

    const writeDesingerClosedDays = async () => {

        console.log(selectedDate)
        try {
            const response = await api.post("/api/designer/day", { id: id, selectedDate: selectedDate }, {
                withCredentials: true,
            });
        } catch (e) {
            console.error('휴무일 입력 오류:', e);

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

            <div className='title'>
                <div className='text'>휴무일</div>
                {lists.map((list, index) => (
                    <div className='text' key={index}>{list.desinger_close_day}</div>
                ))}
            </div>

        </div>
    )
}

export default DesingerClosedDays