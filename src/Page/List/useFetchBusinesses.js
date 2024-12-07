import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBusinesses = (categoryId) => {
  const [listEvents, setListEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found.');
        }

        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/businesses/information`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { category: categoryId }, // URL 파라미터로 카테고리 ID 전달
        });

        setListEvents(response.data); // 가져온 데이터를 상태에 저장
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [categoryId]);

  return { listEvents, loading, error };
};

export default useFetchBusinesses;