import React, { useEffect } from 'react';

function Payments({ closePaymentModal, confirmPayment }) {
    const tossUrl = `${process.env.PUBLIC_URL}/images/logo/toss.png`;
    const kakaoUrl = `${process.env.PUBLIC_URL}/images/auth/KAKAO logo.svg`;
    const naverUrl = `${process.env.PUBLIC_URL}/images/auth/Naver logo.svg`;
    const KGUrl = `${process.env.PUBLIC_URL}/images/logo/KG.png`;

    useEffect(() => {
        if (window.IMP) {
            window.IMP.init('imp63564407');
        } else {
            console.error('IMP 객체를 초기화할 수 없습니다. 포트원 SDK가 제대로 로드되지 않았습니다.');
        }
    }, []);

    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var milliseconds = today.getMilliseconds();
    var makeMerchantUid = hours + minutes + seconds + milliseconds;

    const handlePaymentResponse = (rsp) => {
        if (rsp.success) {
            console.log(rsp);
            window.location.href = 'http://localhost:3000/reservation-confirm';
        } else {
            console.log(rsp);
            alert('결제에 실패하였습니다. 다시 시도해주세요.');
        }
    };

    const kakaoPay = () => {
        window.IMP.request_pay({
            pg: 'kakaopay.TC0ONETIME',
            merchant_uid: "IMP" + makeMerchantUid,
            name: '만두 10kg',
            amount: 1004,
            buyer_email: 'Iamport@chai.finance',
            buyer_name: '아임포트 기술지원팀',
            buyer_tel: '010-1234-5678',
            buyer_addr: '서울특별시 강남구 삼성동',
            buyer_postcode: '123-456',
            m_redirect_url: 'http://localhost:3000/reservation-confirm'
        }, handlePaymentResponse);
    };

    const tossPay = () => {
        window.IMP.request_pay({
            pg: 'tosspay.tosstest',
            pay_method: 'card',
            merchant_uid: makeMerchantUid,
            name: '만두 10kg',
            amount: 1004,
            buyer_email: 'iamport@siot.do',
            buyer_name: '구매자이름',
            buyer_tel: '010-1234-5678',
            buyer_addr: '서울특별시 강남구 삼성동',
            buyer_postcode: '123-456',
            m_redirect_url: 'http://localhost:3000/reservation-confirm'
        }, handlePaymentResponse);
    };

    const KGPay = () => {
        window.IMP.request_pay({
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: "IMP" + makeMerchantUid,
            name: '만두 10kg',
            amount: 1004,
            buyer_email: 'Iamport@chai.finance',
            buyer_name: '아임포트 기술지원팀',
            buyer_tel: '010-1234-5678',
            buyer_addr: '서울특별시 강남구 삼성동',
            buyer_postcode: '123-456',
            m_redirect_url: 'http://localhost:3000/reservation-confirm'
        }, handlePaymentResponse);
    };

    const naverPay = () => {
        window.IMP.request_pay({
            pg: "naverpay",
            merchant_uid: "order_no_0001",
            name: "주문명:결제테스트",
            amount: 1004,
            buyer_email: "test@portone.io",
            buyer_name: "구매자이름",
            buyer_tel: "010-1234-5678",
            buyer_addr: "서울특별시 강남구 삼성동",
            buyer_postcode: "123-456",
            naverUseCfm: "20221231",
            naverPopupMode: true,
            m_redirect_url: "http://localhost:3000/reservation-confirm",
            naverPurchaserName: "구매자이름",
            naverPurchaserBirthday: "20151201",
            naverChainId: "sAMplEChAINid",
            naverMerchantUserKey: "가맹점의 사용자 키",
            naverCultureBenefit: true,
            naverProducts: [
                {
                    "categoryType": "BOOK",
                    "categoryId": "GENERAL",
                    "uid": "107922211",
                    "name": "한국사",
                    "payReferrer": "NAVER_BOOK",
                    "sellerId": "sellerA",
                    "count": 10
                },
                {
                    "categoryType": "MUSIC",
                    "categoryId": "CD",
                    "uid": "299911002",
                    "name": "러블리즈",
                    "payReferrer": "NAVER_BOOK",
                    "sellerId": "sellerB",
                    "count": 1
                }
            ]
        }, handlePaymentResponse);
    };

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    결제
                    <button className='close-button' onClick={closePaymentModal}>X</button>
                </div>
                <div className='modal-body'>
                    <div className='payment-method' onClick={tossPay}>
                        <img src={tossUrl} alt='토스' />
                        토스페이
                    </div>
                    <div className='payment-method' onClick={kakaoPay}>
                        <img src={kakaoUrl} alt='카카오' />
                        카카오페이
                    </div>
                    <div className='payment-method' onClick={naverPay}>
                        <img src={naverUrl} alt='네이버' />
                        네이버페이
                    </div>
                    <div className='payment-method' onClick={KGPay}>
                        <img src={KGUrl} alt='KG' />
                        KG이니시스
                    </div>
                </div>
                <div className='modal-footer'>
                    <button className='modal-button' onClick={closePaymentModal}>취소</button>
                    <button className='modal-button'>결제</button>
                </div>
            </div>
        </div>
    );
}

export default Payments;
