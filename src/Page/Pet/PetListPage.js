import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetInfo from './PetInfo';


const PetListPage = () => {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
    const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
    const petUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img.png`;

    const goBack = () => {
        navigate(-1);
    };
    
    return (
        <div lang='ko'>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={goBack} />
                </button>
                등록 펫 목록
                <button className='note' onClick={()=>navigate('/pet/registration')}>
                    <img src={noteUrl} alt='' />
                </button>
            </div>
            <PetInfo isSelectable={false} fileName={"list"}/>
        </div>
    );
};

export default PetListPage;
