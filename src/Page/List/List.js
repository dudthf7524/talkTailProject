import React from 'react';
import Event from './Events';

const List = ({ listEvents }) => {
  // props로 listEvents 받기
  return (
    <div className='list-mid'>
      {Array.isArray(listEvents) && listEvents.map(event => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}

export default List;