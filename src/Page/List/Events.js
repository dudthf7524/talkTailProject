import React from 'react';
import EventTags from './EventTags';
import { useNavigate } from 'react-router-dom';

const Event = ({ event, searchTerm }) => {
    console.log(event)
    const navigate = useNavigate();
    console.log(searchTerm)
    const aaa = () => {
        alert('aaa')
    }
    
    const handleClick = () => {
        navigate(`/business/detail/${event.business_information_id}`);
    };

    return (
        <div
            className='list-list-container'
            key={event.business_information_id}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className='list-image-container'>
                {/* 이미지 URL이 존재하는 경우에만 렌더링 */}
                {event.business_main_image ? (
                    <img
                        src={event.business_main_image}
                        alt={event.business_name}
                    />
                ) : (
                    <div>No Image Available</div> // 이미지가 없는 경우 대체 텍스트
                )}
            </div>
            <div className='text-container'>
                <div className='list-title-container'>
                    <div className='list-title'>{event.business_name}</div>
                    <EventTags tags={['소형견', '대형견', 'CCTV']} />
                    <div className='list-content'>{event.address_road} {event.address_detail}</div>
                </div>
                <div className='list-title-container'>
                   <button onClick={()=>{
                    aaa()
                   }}>권한요청</button>
                </div>
            </div>
            
        </div>
    );
};

export default Event;