import React from 'react';
import '../../CSS/reservationModal.css'

const ReservationAcceptModal = ({ isOpen, onClose, onConfirm,registerInformation,mainImage,priceImage, actionType }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content1">
          <div>이 예약을 확정합니다. {registerInformation.dayoff}</div>
          <div className="modal-buttons">
          {mainImage.map((file, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview ${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                />
                {/* <button
                  onClick={() => handleDelete(index)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                >
                  X
                </button> */}
              </div>
            ))}
            
            <button className='cancel-btn' onClick={onClose}>취소</button>
            <button className='confirm-btn' onClick={onConfirm}>수락</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ReservationAcceptModal;