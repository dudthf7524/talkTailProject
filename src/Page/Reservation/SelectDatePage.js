import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Payments from './Payments';

const Review = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
    const calenderUrl = `${process.env.PUBLIC_URL}/PageImage/list/calender.svg`;

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const goBack = () => {
        navigate(-1);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const clearDate = (event) => {
        event.preventDefault();
        setSelectedDate(null);
        setShowCalendar(false);
    };

    const cancelSelection = (event) => {
        console.log('aaa')
        event.preventDefault();
        setShowCalendar(false);
    };

    const confirmSelection = (event) => {
        event.preventDefault();
        setShowCalendar(false);
    };

    const CustomHeader = ({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        decreaseYear,
        increaseYear,
        prevYearButtonDisabled,
        nextYearButtonDisabled,
    }) => (
        <div className="custom-header">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {'<'}
            </button>
            <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(value)}
            >
                {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                    <option key={month} value={month}>
                        {month + 1}
                    </option>
                ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {'>'}
            </button>
            <button onClick={decreaseYear} disabled={prevYearButtonDisabled}>
                {'<'}
            </button>
            <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(value)}
            >
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <button onClick={increaseYear} disabled={nextYearButtonDisabled}>
                {'>'}
            </button>
        </div>
    );

    const customDayClassNames = (date) => {
        if (date.getMonth() !== selectedDate.getMonth()) {
            return 'outside-month';
        }
        return undefined;
    };

    const openPaymentModal = () => {
        setShowPaymentModal(true);
    };

    const closePaymentModal = () => {
        setShowPaymentModal(false);
    };

    const confirmPayment = () => {
        setShowPaymentModal(false);
        navigate('/reservation-confirm');
    };

    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    예약신청서
                    <div></div>
                </div>
                <div className='review-mid'>
                    <div className='schedule-container'>
                        <div className='schedule-contents'>
                            <div className='schedule-text'>
                                date
                            </div>
                            <div className='schedule'>
                                {selectedDate.toISOString().substring(0, 10)}
                                <button onClick={() => setShowCalendar(!showCalendar)}>
                                    <img src={calenderUrl} alt=''/>
                                </button>
                            </div>
                        </div>
                        {showCalendar && (
                            <div className='schedule-calendar-container'>
                                <div className="calendar-wrapper">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        inline
                                        renderCustomHeader={(props) => (
                                            <CustomHeader
                                                {...props}
                                                decreaseYear={() => props.changeYear(props.date.getFullYear() - 1)}
                                                increaseYear={() => props.changeYear(props.date.getFullYear() + 1)}
                                            />
                                        )}
                                        dayClassName={(date) =>
                                            date.getMonth() !== selectedDate.getMonth() ? 'outside-month' : undefined
                                        }
                                        calendarClassName="custom-calendar"
                                        clearDate
                                    />
                                    <div className="calendar-buttons">
                                        <button className="schedule-calendar-button" onClick={clearDate}>
                                            Clear
                                        </button>
                                        <div className='schedule-calendar-button-container'>
                                            <button className="schedule-calendar-button " onClick={cancelSelection}>
                                                Cancel
                                            </button>
                                            <button className="schedule-calendar-button" onClick={confirmSelection}>
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='schedule-contents'>
                            <div className='schedule-text'>
                                time
                            </div>
                            <div className='schedule2'>
                                <div>
                                    <select>
                                        <option>오전</option>
                                        <option>오후</option>
                                    </select>
                                </div>
                                <div>
                                    <select className='times'>
                                        <option>1시</option>
                                        <option>2시</option>
                                        <option>3시</option>
                                        <option>4시</option>
                                        <option>5시</option>
                                        <option>6시</option>
                                        <option>7시</option>
                                        <option>8시</option>
                                        <option>9시</option>
                                        <option>10시</option>
                                        <option>11시</option>
                                        <option>12시</option>
                                    </select>
                                </div>
                                <div>
                                    <select>
                                        <option>00분</option>
                                        <option>30분</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Nbutton' onClick={openPaymentModal}>예약등록</div>
            
            {showPaymentModal && (
                <Payments closePaymentModal={closePaymentModal} confirmPayment={confirmPayment} />
                )}
        </div>
    );
};

export default Review;
