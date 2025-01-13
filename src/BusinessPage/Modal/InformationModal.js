import React from 'react';
import '../../BusinessCSS/reservationModal.css'

const InformationModal = ({ isOpen, onClose, onConfirm, registerInformation, mainImage, priceImage, actionType }) => {
 
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h3>아래의 내용으로 저장하시겠습니까?</h3>
        <div className='img-preview-container'>
          <p>메인 이미지</p>
          {mainImage.map((file, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', marginBottom: "20px" }}
              />
            </div>
          ))}
        </div>
        <div className='img-preview-container'>
          <p>가격표 이미지</p>
          {

          }
          {priceImage.map((file, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div className='registerInformation-content'>
          <p>상호명</p>
          <span> {registerInformation.business_name}</span>
          <p>우편번호</p>
          <span> {registerInformation.address_postcode}</span>
          <p>도로명 주소</p>
          <span> {registerInformation.address_road}</span>
          <p>자번 주소</p>
          <span> {registerInformation.address_jibun}</span>
          <p>상세 주소</p>
          <span> {registerInformation.address_detail}</span>
          <p>가게전화번호</p>
          <span> 
            {registerInformation.business_phone1}-
            {registerInformation.business_phone2}-
            {registerInformation.business_phone3}
          </span>
          <p>인삿말</p>
          <span> {registerInformation.business_comment}</span>
          <p>노쇼 금액</p>
          <span> {registerInformation.business_no_show}</span>
        </div>

        <div className="modal-buttons">
          <button className='cancel-btn' onClick={onClose}>취소</button>
          <button className='confirm-btn' onClick={onConfirm}>수락</button>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;