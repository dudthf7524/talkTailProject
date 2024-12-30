import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

const EditAddressPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { prevPath } = location.state || { prevPath: '/edit-user' };
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;

    const style = {
        width: "100%",
        height: "600px",
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        navigate(prevPath, { state: { address, zonecode } });
    };

    return (
        <div lang='ko' className='mid'>
            <div className='navigation'>
                <button onClick={() => navigate(prevPath)}>
                    <img src={arrowButtonUrl} alt='' />
                </button>
                주소 입력
                <div></div>
            </div>
            <div className='edit-mid'>
                <DaumPostcode 
                    style={style}
                    onComplete={completeHandler}
                />
            </div>
        </div>
    );
};

export default EditAddressPage;
