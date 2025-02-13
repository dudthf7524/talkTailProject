import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    console.log(code)
    useEffect(() => {
        let authProvider = '';

        const fetchUserInfo = async () => {
            console.log(window.location.pathname)
            try {
                let authCode = '';

                if (window.location.pathname === '/auth/kakao') {
                    authProvider = 'kakao';
                    authCode = code;
                } else if (window.location.pathname === '/auth/naver') {
                    authProvider = 'naver';
                    authCode = code;
                } else if (window.location.pathname === '/auth/google') {
                    authProvider = 'google';
                    authCode = code;
                }

                if (!authCode) {
                    throw new Error('Authorization code not found.');
                }

                let endpoint = '';
                console.log(authProvider)
                console.log(apiUrl)
                if (authProvider === 'kakao') {
                    endpoint = `${apiUrl}/api/auth/kakao?code=${authCode}`;
                } else if (authProvider === 'naver') {
                    endpoint = `${apiUrl}/api/auth/naver?code=${authCode}`;
                } else if (authProvider === 'google') {
                    endpoint = `${apiUrl}/api/auth/google?code=${authCode}`;
                }
                console.log(endpoint)
                const response = await axios.get(endpoint);
               
                const token = response.data.token;
                console.log(token)
                localStorage.setItem('token', token); // 토큰 저장

                navigate('/');
            } catch (error) {
                console.error(`${authProvider} login error:`, error);
                // 오류 처리 로직 추가
            }
        };

        if (code) {
            fetchUserInfo();
        } else {
            console.error('Authorization code not found.');
        }
    }, [code, navigate, apiUrl]);

    return (
        <div>
            로그인 중입니다.
        </div>
    );
};

export default Redirection;
