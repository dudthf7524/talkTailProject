import React from 'react';

const EventTags = ({ tags = [] }) => {
    return (
        <div className="list-tag-container">
            {tags.length > 0 ? (
                tags.map((tag, index) => (
                    <div key={index} className='list-tag'>
                        {tag}
                    </div>
                ))
            ) : (
                <div>No Tags Available</div> // 태그가 없을 경우 표시
            )}
        </div>
    );
};

export default EventTags;
