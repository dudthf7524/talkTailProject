import logo from './logo.svg';
import './App.css';
import Register from './BusinessPage/Regitser';
import { Link, Route, Router, Routes } from 'react-router-dom';
import './BusinessCSS/page.css';
import './BusinessCSS/main.css';
import './BusinessFont/font.css';
import Login from './BusinessPage/LoginPage';
import AdminMenu from './BusinessPage/MenuPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from './Page/Login/LoginPage';
import RegisterInformation from './BusinessPage/Registerinformation';
import { ImageProvider } from './Contexts/ImageContext';
import ImgUpload from './BusinessPage/ImgUpload';
import Redirection from './Page/Login/Redirection';
import KoginSuccess from "./Page/Login/LoginSuccessPage";
import './CSS/components.css';
import EditUserPage from './Page/User/EditUserPage';
import HomePage from './Page/Home/HomePage';
import ListPage from './Page/List/ListPage';
import BusinessDetailPage from './Page/List/BusinessDetailPage';
function App() {
  const [imageFiles, setImageFiles] = useState({
    main: [],
    sub: [],
    album: [],
    review: [],
    pricing: [],
  });
  const handleSetImageFiles = (imageType, files) => {
    setImageFiles((prevFiles) => ({
      ...prevFiles,
      [imageType]: files,
    }));
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:8383/user/auth')
      .then((response) => {
        console.log(response.data)
        setUser(response.data); // Set the users state with the response data
      })
      .catch((error) => {
        console.error("Error fetching users:", error); // Handle errors
      })
  }, []);
  console.log(user)

  return (
    <div className="App">
      <div className="Container">

        <ImageProvider>
          <Routes>

            <Route path="/" element={<LoginPage />} />
            <Route path="/auth/*" element={<Redirection />} />
            <Route path="/login-success" element={<KoginSuccess />} />
            <Route path="/edit-user" element={<EditUserPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/list/:id" element={<ListPage />} />
            <Route path="/business/detail/:id" element={<BusinessDetailPage />} />
            {/* <Route path="/admin" element={<>
              <Link to="/register">회원가입</Link>
              {user ? `관리자 ${user.business_owner_name}님 환영합니다!` : 'Log-In'}
              <Link to="/login">로그인</Link>
              <Link to="/admin-menu">관리자</Link>
            </>} /> */}

            <Route path="/business">
              <Route path="login" element={<Login />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="register" element={<Register />} />
              <Route path="register/information" element={<RegisterInformation />} />
              <Route path="imgupload/:imageType" element={<ImgUpload setImageFiles={handleSetImageFiles} />} />
            </Route>
          </Routes>
        </ImageProvider>
      </div>
    </div>
  );
}

export default App;
