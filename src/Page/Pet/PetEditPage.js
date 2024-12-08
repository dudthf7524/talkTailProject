import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Api';

const PetEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 펫 ID 가져오기

    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const defaultPetImgUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img_L.png`;
    const [petImgUrl, setPetImgUrl] = useState(defaultPetImgUrl);
    const [selectedImageFile, setSelectedImageFile] = useState(null); 

    const [formData, setFormData] = useState({
        name: '',
        species: '',
        speciesId: '',
        breed: '',
        breedId: '',
        birthDate: '',
        weight: '',
        gender: '',
        additionalInfo: '',
        etc: '',
    });
    const [speciesDetails, setSpeciesDetails] = useState([]);
    const [petSpecies, setPetSpecies] = useState([]);
    const [speciesInputValue, setSpeciesInputValue] = useState('');
    const [speciesSuggestions, setSpeciesSuggestions] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [breedsInputValue, setBreedsInputValue] = useState('');
    const [breedsSuggestions, setBreedsSuggestions] = useState([]);

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await api.get(`/api/pet/${id}`);
                const data = response.data;
                setFormData({
                    name: data.name,
                    species: data.species,
                    speciesId: data.speciesId,
                    breed: data.breed,
                    breedId: data.breedId,
                    birthDate: data.birthDate,
                    weight: data.weight,
                    gender: data.gender === 1 ? '남자' : '여자',
                    additionalInfo: data.additionalInfo ? 'true' : 'false',
                    etc: data.etc,
                });
                setPetImgUrl(data.image || defaultPetImgUrl);
                setSpeciesDetails(data.details);
            } catch (error) {
                console.error('펫 데이터 가져오기 에러:', error);
            }
        };
        fetchPetData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPetImgUrl(reader.result);
                setSelectedImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const petData = new FormData();
        petData.append('name', formData.name);
        petData.append('species', formData.speciesId);
        petData.append('breed', formData.breedId);
        petData.append('birthDate', formData.birthDate);
        petData.append('weight', formData.weight);
        petData.append('gender', formData.gender === '남자' ? 1 : 0);
        petData.append('etc', formData.additionalInfo === 'true' ? formData.etc : '');
    
        if (selectedImageFile) {
            petData.append('image', selectedImageFile); // 이미지 파일 추가
        }
    
        speciesDetails.forEach((detail, index) => {
            petData.append(`details[${index}][id]`, detail.optionId);
            petData.append(`details[${index}][value]`, formData[detail.option] === 'true' ? 1 : 0);
        });
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found.');
            }
            const response = await api.put(`/api/pet/${id}/update`, petData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Update successful', response.data);
            navigate(`/pet-detail/${id}`);
        } catch (error) {
            console.error('펫 정보 수정 에러: ', error);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div lang='ko'>
            <div className='r-mid'>
                <div className='navigation'>
                    <button onClick={goBack}>
                        <img src={arrowButtonUrl} alt='뒤로가기' />
                    </button>
                    펫 정보 수정
                    <div></div>
                </div>
                <div className='re-mid'>
                    <div className='PetRegistration-container'>
                        <input
                            type="text"
                            className="textbox"
                            placeholder='펫 이름'
                            value={formData.name}
                            onChange={handleInputChange}
                            name='name'
                        />
                    </div>
                    <div className='PetRegistration-img-container'>
                        <div className='PetRegistration-content'>
                            <div className='upload-img'>
                                <img src={petImgUrl} alt='펫 이미지' />
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>종류</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={formData.species}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>품종</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={formData.breed}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>태어난 날</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            name='birthDate'
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>몸무게</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={formData.weight}
                            onChange={handleInputChange}
                            name='weight'
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>성별</p>
                        <select
                            value={formData.gender}
                            onChange={handleInputChange}
                            name='gender'
                        >
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                        </select>
                    </div>
                    {speciesDetails.map((detail, index) => (
                        <div key={index} className='PetRegistration-container2'>
                            <p>{detail.option}</p>
                            <select
                                value={formData[detail.option]}
                                onChange={handleInputChange}
                                name={detail.option}
                            >
                                <option value="true">예</option>
                                <option value="false">아니오</option>
                            </select>
                        </div>
                    ))}
                    <div className='PetRegistration-container2'>
                        <p>기타 추가 사항</p>
                        <textarea
                            className="textbox-gray2"
                            value={formData.etc}
                            onChange={handleInputChange}
                            name='etc'
                        />
                    </div>
                    <div className='PetRegistration-container'>
                        <button onClick={handleSubmit}>저장하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetEdit;
