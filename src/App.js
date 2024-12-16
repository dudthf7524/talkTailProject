import logo from './logo.svg';
import './App.css';
import Register from './BusinessPage/Regitser';
import { Link, Route, Router, Routes } from 'react-router-dom';
import './BusinessCSS/page.css';
import './BusinessCSS/main.css';
import './BusinessFont/font.css';
import Login from './BusinessPage/LoginPage';
import BusinessMenu from './BusinessPage/MenuPage';
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
import RegisterDesinger from './BusinessPage/RegisterDesinger';
import PetDesigner from './Page/List/PetDesigner';
import SelectDatePage from './Page/Reservation/SelectDatePage';
import PetRegistrationPage from './Page/Pet/PetRegistrationPage';
import MyPage from "./Page/MyPage/MyPage";
import PetListPage from "./Page/Pet/PetListPage";
import PetSelectPage from "./Page/Pet/PetSelectPage";
import ReservationRequestPage from "./Page/Reservation/ReservationRequestPage";
import ReservatinConfirm from "./Page/Reservation/ReservationConfirmPage";
import PetDetailPage from "./Page/Pet/PetDetailPage";
import PetEditPage from "./Page/Pet/PetEditPage";
import AuthorityManagement from './BusinessPage/AuthorityManagement';
import UserInformation from "./Page/User/UserInformation";

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
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8383/user/auth')
  //     .then((response) => {
  //       console.log(response.data)
  //       setUser(response.data); // Set the users state with the response data
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users:", error); // Handle errors
  //     })
  // }, []);
  // console.log(user)

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
            <Route path="/designer/list/:id" element={<PetDesigner />} />
            <Route path="/select/date/:id" element={<SelectDatePage />} />
            <Route path="/pet/registration" element={<PetRegistrationPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/pet/list" element={<PetListPage />} />
            <Route path="/pet-select/:id" element={<PetSelectPage />} />
            <Route path="/reservation-request/:id" element={<ReservationRequestPage />}/>
            <Route path="/reservation-confirm" element={<ReservatinConfirm />}/>
            <Route path="/pet/detail/:id" element={<PetDetailPage/>} />
            <Route path="/pet-edit/:id" element={<PetEditPage/>} />
            <Route path="/user/information" element={<UserInformation/>} />



            <Route path="/business">
              <Route path="login" element={<Login />} />
              <Route path="menu" element={<BusinessMenu />} />
              <Route path="register" element={<Register />} />
              <Route path="register/information" element={<RegisterInformation />} />
              <Route path="imgupload/:imageType" element={<ImgUpload setImageFiles={handleSetImageFiles} />} />
              <Route path="register/desinger" element={<RegisterDesinger/>} />
              <Route path="authority/management" element={<AuthorityManagement />} />

            </Route>
          </Routes>
        </ImageProvider>
      </div>
    </div>
  );
}

export default App;
