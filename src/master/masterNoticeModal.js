import "../masterCss/masterNoticeModal.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MasterNoticeModal = ({ openModal, noticeId }) => {
  const [noticeList, setNoticeList] = useState();
  useEffect(() => {
    const loadDatas = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/master/loadNoticeDetail`,
          { noticeId }
        );
        setNoticeList(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadDatas();
  }, []);
  return (
    <div className="master_notice_modal master_modal">
      <p className="delete_btn" onClick={openModal}>
        X
      </p>
      <div className="box left_box">
        <p>notice_analSac</p>
        <p>notice_claw</p>
        <p>notice_ear</p>
        <p>notice_etc</p>
        <p>notice_eye</p>
        <p>notice_hairTangling</p>
        <p>notice_skin</p>
        <p>notice_sole</p>
        <p>notice_style</p>
      </div>
      <div className="box right_box">
        <p>{noticeList?.notice_analSac}</p>
        <p>{noticeList?.notice_claw}</p>
        <p>{noticeList?.notice_ear}</p>
        <p>{noticeList?.notice_etc}</p>
        <p>{noticeList?.notice_eye}</p>
        <p>{noticeList?.notice_hairTangling}</p>
        <p>{noticeList?.notice_skin}</p>
        <p>{noticeList?.notice_sole}</p>
        <p>{noticeList?.notice_style}</p>
      </div>
    </div>
  );
};

export default MasterNoticeModal;
