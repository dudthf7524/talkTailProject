import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchBeautyList } from "../../redux/beautyList";

const useFetchBusinesses = (categoryId) => {
  const [listEvents, setListEvents] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { beautyListData, loading, error } = useSelector(
    (state) => state.beautyList || {}
  );

  useEffect(() => {
    dispatch(fetchBeautyList());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    // 초기값 설정
  });

  useEffect(() => {
    if (beautyListData) {
      setListEvents(beautyListData);
    }
  }, [beautyListData]);

  // useEffect(() => {
  //   const fetchBusinesses = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) {
  //         throw new Error('No token found.');
  //       }

  //       setLoading(true);
  //       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/businesses/information`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: { category: categoryId }, // URL 파라미터로 카테고리 ID 전달
  //       });

  //       setListEvents(response.data); // 가져온 데이터를 상태에 저장

  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBusinesses();
  // }, [categoryId]);

  return { listEvents, loading, error };
};

export default useFetchBusinesses;
