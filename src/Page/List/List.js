import React from 'react';
import Event from './Events';

const List = ({ listEvents, searchTerm }) => {
  // props로 listEvents 받기
  return (
    <div className='list-mid'>
      {Array.isArray(listEvents) && listEvents.map(event => (
        <Event key={event.id} event={event}  searchTerm={searchTerm}/>
      ))}
    </div>
  );
}

export default List;