import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/noticeBusiness.css';
import '../CSS/noticeModal.css';
import NoticeSendModal from './Modal/NoticeSend';
import api from '../Api'

const WriteNotice = () => {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const { id } = useParams();
    console.log(id)
    const [formData, setFormData] = useState({
        notice_style: '',
        notice_etc: ''

    })
    const [selectedOptions, setSelectedOptions] = useState({
        notice_skin: '',
        notice_ear: '',
        notice_eye: '',
        notice_sole: '',
        notice_claw: '',
        notice_analSac: '',
        notice_hairTangling: '',
    });
    console.log(formData)

    const handleCheckboxChange = (category, value) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    console.log(selectedOptions)
    const handleConfirm = async () => {
        try {
            const response = await api.post(`/api/customer/notice/write/${id}`,
                {
                    formData,
                    selectedOptions

                },
                { withCredentials: true });

            console.log('보내기 작업 수행');
            closeModal();

            setTimeout(() => {
                navigate('/business/customer/management');
            }, 2000); // 2초 후 리다이렉트
        } catch (error) {
            console.log('알림장 작성 실패', error)
        }

    };


    return (
        <div className='page-container' lang='ko'>
            <div className='page-container2'>
                <div className='navigation'>
                    <button>
                        <img
                            src={arrowButtonUrl}
                            alt=''
                            onClick={() => navigate('/business/customer/management')}
                        />
                    </button>
                    알림장 작성
                    <div> </div>
                </div>
                <div className='pet-title'>
                    <div className='pet-name'>누렁이</div>
                    <div className='pet-information'>리트리버/남/2살</div>
                </div>
                <div className='notice-row'>
                    <div className='notice-title'>스타일</div>
                    <input
                        className='notice-textbox'
                        type='text'
                        name='notice_style'
                        value={formData.style}
                        onChange={handleInputChange}
                        placeholder='스타일을 입력해 주세요.' />
                </div>
                {/* 피부 */}
                <div className='notice-row'>
                    <div className='notice-title'>피부</div>
                    <div className='notice-checkboxes'>
                        <label>
                            <input
                                type='radio'
                                name='notice_skin'
                                value='good'
                                checked={selectedOptions.notice_skin === '좋음'}
                                onChange={() => handleCheckboxChange('notice_skin', '좋음')}
                            />
                            좋음
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_skin'
                                value='dry'
                                checked={selectedOptions.notice_skin === '건조'}
                                onChange={() => handleCheckboxChange('notice_skin', '건조')}
                            />
                            건조
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_skin'
                                value='sensitive'
                                checked={selectedOptions.notice_skin === '민감'}
                                onChange={() => handleCheckboxChange('notice_skin', '민감')}
                            />
                            민감
                        </label>

                    </div>
                </div>

                {/* 귀 */}
                <div className='notice-row'>
                    <div className='notice-title'>귀</div>
                    <div className='notice-checkboxes'>
                        <label>
                            <input
                                type='radio'
                                name='notice_ear'
                                value='clear'
                                checked={selectedOptions.notice_ear === '깨끗함'}
                                onChange={() => handleCheckboxChange('notice_ear', '깨끗함')}
                            />
                            깨끗함
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_ear'
                                value='yellow-ear'
                                checked={selectedOptions.notice_ear === '노란귀지'}
                                onChange={() => handleCheckboxChange('notice_ear', '노란귀지')}
                            />
                            노란귀지
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_ear'
                                value='brown-ear'
                                checked={selectedOptions.notice_ear === '갈색귀지'}
                                onChange={() => handleCheckboxChange('notice_ear', '갈색귀지')}
                            />
                            갈색귀지
                        </label>
                    </div>
                </div>

                {/* 눈 */}
                <div className='notice-row'>
                    <div className='notice-title'>눈</div>
                    <div className='notice-checkboxes'>
                        <label>
                            <input
                                type='radio'
                                name='notice_eye'
                                value='clear'
                                checked={selectedOptions.notice_eye === '깨끗함'}
                                onChange={() => handleCheckboxChange('notice_eye', '깨끗함')}
                            />
                            깨끗함
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_eye'
                                value='eyelid'
                                checked={selectedOptions.notice_eye === '눈꼽'}
                                onChange={() => handleCheckboxChange('notice_eye', '눈꼽')}
                            />
                            눈꼽
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_eye'
                                value='congestion'
                                checked={selectedOptions.notice_eye === '충혈'}
                                onChange={() => handleCheckboxChange('notice_eye', '충혈')}
                            />
                            충혈
                        </label>
                    </div>
                </div>

                {/* 발바닥 */}
                <div className='notice-row'>
                    <div className='notice-title'>발바닥</div>
                    <div className='notice-checkboxes'>
                        <label>
                            <input
                                type='radio'
                                name='notice_sole'
                                value='good'
                                checked={selectedOptions.notice_sole === '좋음'}
                                onChange={() => handleCheckboxChange('notice_sole', '좋음')}
                            />
                            좋음
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_sole'
                                value='eczema'
                                checked={selectedOptions.notice_sole === '습진'}
                                onChange={() => handleCheckboxChange('notice_sole', '습진')}
                            />
                            습진
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_sole'
                                value='dry'
                                checked={selectedOptions.notice_sole === '건조'}
                                onChange={() => handleCheckboxChange('notice_sole', '건조')}
                            />
                            건조
                        </label>
                    </div>
                </div>

                {/* 발톱 */}
                <div className='notice-row'>
                    <div className='notice-title'>발톱</div>
                    <div className='notice-checkboxes'>
                        <label>
                            <input
                                type='radio'
                                name='notice_claw'
                                value='good'
                                checked={selectedOptions.notice_claw === '적당함'}
                                onChange={() => handleCheckboxChange('notice_claw', '적당함')}
                            />
                            적당함
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_claw'
                                value='short'
                                checked={selectedOptions.notice_claw === '짧음'}
                                onChange={() => handleCheckboxChange('notice_claw', '짧음')}
                            />
                            짧음
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_claw'
                                value='management'
                                checked={selectedOptions.notice_claw === '관리필요'}
                                onChange={() => handleCheckboxChange('notice_claw', '관리필요')}
                            />
                            관리필요
                        </label>
                    </div>
                </div>

                {/* 항문낭 */}
                <div className='notice-row'>
                    <div className='notice-title'>항문낭</div>
                    <div className='notice-checkboxes'>
                        <label>
                            <input
                                type='radio'
                                name='notice_analSac'
                                value='good'
                                checked={selectedOptions.notice_analSac === '적당함'}
                                onChange={() => handleCheckboxChange('notice_analSac', '적당함')}
                            />
                            적당함
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_analSac'
                                value='many'
                                checked={selectedOptions.notice_analSac === '많음'}
                                onChange={() => handleCheckboxChange('notice_analSac', '많음')}
                            />
                            많음
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_analSac'
                                value='none'
                                checked={selectedOptions.notice_analSac === '안나옴'}
                                onChange={() => handleCheckboxChange('notice_analSac', '안나옴')}
                            />
                            안나옴
                        </label>
                    </div>
                </div>

                {/* 털엉킴 */}
                <div className='notice-row'>
                    <div className='notice-title'>털엉킴</div>
                    <div className='notice-checkboxes'>
                        <label>
                            <input
                                type='radio'
                                name='notice_hairTangling'
                                value='yes'
                                checked={selectedOptions.notice_hairTangling === '유'}
                                onChange={() => handleCheckboxChange('notice_hairTangling', '유')}
                            />
                            유
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='notice_hairTangling'
                                value='no'
                                checked={selectedOptions.notice_hairTangling === '무'}
                                onChange={() => handleCheckboxChange('notice_hairTangling', '무')}
                            />
                            무
                        </label>
                    </div>
                </div>

                <div className='notice-row'>
                    <div className='notice-title2'>기타 전달사항</div>
                </div>
                <div className='notice-row'>

                    <textarea
                        className='notice-textbox2'
                        type='text'
                        id='notice_etc'
                        name='notice_etc'
                        value={formData.etc_meno}
                        onChange={handleInputChange}
                        placeholder='전달사항을 입력해주세요.'
                    />
                </div>
                <div className='notice-footer'>
                    <button className='send-btn' onClick={openModal}>보내기</button>
                </div>


            </div>
            <NoticeSendModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default WriteNotice;
