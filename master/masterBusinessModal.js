import "../masterCss/masterBusinessModal.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MasterBusinessModal = ({ openModal, businessId }) => {
  const [businessList, setBusinessList] = useState();
  useEffect(() => {
    const loadDatas = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/master/loadBusinessDetail`,
          { businessId }
        );
        setBusinessList(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadDatas();
  }, []);
  return (
    <div className="master_business_modal master_modal">
      <p className="delete_btn" onClick={openModal}>
        X
      </p>
      <div className="box left_box">
        <p>business_registration_number</p>
        <p>business_registration_name</p>
        <p>category</p>
        <p>business_owner_name</p>
        <p>business_owner_email</p>
        <p>business_owner_phone</p>
        <p>created_at</p>
      </div>
      <div className="box right_box">
        <p>{businessList?.business_registration_number}</p>
        <p>{businessList?.business_registration_name}</p>
        <p>{businessList?.category}</p>
        <p>{businessList?.business_owner_name}</p>
        <p>{businessList?.business_owner_email}</p>
        <p>{businessList?.business_owner_phone}</p>
        <p>{businessList?.created_at}</p>
      </div>
    </div>
  );
};

export default MasterBusinessModal;
