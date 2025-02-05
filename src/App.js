import Register from "./BusinessPage/Regitser";
import { Link, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import "./CSS/total.css";
// import './BusinessCSS/page.css';
// import './BusinessCSS/main.css';
import "./BusinessFont/font.css";
// import './CSS/components.css';
import Login from "./BusinessPage/LoginPage";
import BusinessMenu from "./BusinessPage/MenuPage";
import { useEffect, useState } from "react";

import LoginPage from "./Page/Login/LoginPage";
import RegisterInformation from "./BusinessPage/Registerinformation";
import { ImageProvider } from "./Contexts/ImageContext";
import ImgUpload from "./BusinessPage/ImgUpload";
import Redirection from "./Page/Login/Redirection";
import LoginSuccess from "./Page/Login/LoginSuccessPage";
import UserDetailPage from "./Page/User/UserDetailPage";
import HomePage from "./Page/Home/HomePage";
import ListPage from "./Page/List/ListPage";
import BusinessDetailPage from "./Page/List/BusinessDetailPage";
import RegisterDesinger from "./BusinessPage/RegisterDesinger";
import PetDesigner from "./Page/List/PetDesigner";
import SelectDatePage from "./Page/Reservation/SelectDatePage";
import PetRegistrationPage from "./Page/Pet/PetRegistrationPage";
import MyPage from "./Page/MyPage/MyPage";
import PetListPage from "./Page/Pet/PetListPage";
import PetSelectPage from "./Page/Pet/PetSelectPage";
import ReservationRequestPage from "./Page/Reservation/ReservationRequestPage";
import ReservatinConfirm from "./Page/Reservation/ReservationConfirmPage";
import PetDetailPage from "./Page/Pet/PetDetailPage";
import PetEditPage from "./Page/Pet/PetEditPage";
import AuthorityManagement from "./BusinessPage/AuthorityManagement";
import UserInformation from "./Page/User/UserInformation";
import RegisterStyle from "./BusinessPage/RegisterStyle";
import ReservationManagement from "./BusinessPage/ReservationManagement";
import BusinessReservationDetail from "./BusinessPage/ReservationDetail";
import CustomerManagement from "./BusinessPage/CustomerManagement";
import WriteNotice from "./BusinessPage/WriteNotice";
import SelectedDatePage from "./Page/Reservation/SelectedDatePage";
import EditAddressPage from "./Page/User/EditAddressPage";
import UserEdit from "./Page/User/UserEdit";
import Reservation from "./Page/MyPage/Reservation";
import DateRegister from "./BusinessPage/DateRegister";
import DateEdit from "./BusinessPage/DateEdit";
import DayOnOffEdit from "./BusinessPage/DayOnOffEdit";
import EditInformation from "./BusinessPage/EditInformation";
import BusinessBeautyEditOption from "./BusinessPage/BusinessBeautyEditOption";
import ReservationDetail from "./Page/MyPage/ReservationDetail";
import AccountNumber from "./BusinessPage/AccountNumber";
import Notice from "./Page/MyPage/Notice";
import NoticeDetail from "./Page/MyPage/NoticeDetail";
import DesingerList from "./BusinessPage/DesingerList";
import DesingerClosedDays from "./BusinessPage/DesingerClosedDays";
import Authority from "./Page/User/Authority";
import BusinessReservation from "./BusinessPage/Reservation";
import ReservationDesinger from "./BusinessPage/ReservationDesinger";
import AccountNumberList from "./BusinessPage/AccountNumberList";


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
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route path="/user/detail" element={<UserDetailPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/list/:id" element={<ListPage />} />
            <Route
              path="/business/detail/:id"
              element={<BusinessDetailPage />}
            />
            <Route path="/designer/list" element={<PetDesigner />} />
            <Route path="/select/date/:id" element={<SelectDatePage />} />
            <Route path="/pet/registration" element={<PetRegistrationPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/pet/list" element={<PetListPage />} />
            <Route path="/pet-select/:id" element={<PetSelectPage />} />
            <Route
              path="/reservation-request/:id"
              element={<ReservationRequestPage />}
            />
            <Route
              path="/reservation-confirm"
              element={<ReservatinConfirm />}
            />
            <Route path="/pet/detail/:id" element={<PetDetailPage />} />
            <Route path="/pet-edit/:id" element={<PetEditPage />} />
            <Route path="/user/information" element={<UserInformation />} />
            <Route path="/selected/date/:id" element={<SelectedDatePage />} />
            <Route path="/edit-address" element={<EditAddressPage />} />
            <Route path="/user/edit" element={<UserEdit />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservation/detail/:id" element={<ReservationDetail />} />
            
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/authority/management" element={<Authority />}/>

            <Route path="/business">
              <Route path="login" element={<Login />} />
              <Route path="menu" element={<BusinessMenu />} />
              <Route path="register" element={<Register />} />
              <Route
                path="register/information"
                element={<RegisterInformation />}
              />
              <Route path="edit/information" element={<EditInformation />} />
              <Route
                path="imgupload/:pathName/:imageType"
                element={<ImgUpload setImageFiles={handleSetImageFiles} />}
              />
              <Route path="register/desinger" element={<RegisterDesinger />} />
              <Route path="authority/management" element={<AuthorityManagement />}/>
              <Route path="register/style" element={<RegisterStyle />} />
              <Route
                path="reservation/management"
                element={<ReservationManagement />}
              />
              <Route
                path="reservation/detail/:id"
                element={<BusinessReservationDetail />}
              />
              <Route
                path="customer/management"
                element={<CustomerManagement />}
              />
              <Route path="write/notice/:id" element={<WriteNotice />} />
              <Route path="date/register" element={<DateRegister />} />
              <Route path="date/edit" element={<DateEdit />} />
              <Route path="day-on-off/edit" element={<DayOnOffEdit />} />
              <Route path="edit/option" element={<BusinessBeautyEditOption />}/>
              <Route path="account/number" element={<AccountNumber />}/>
              <Route path="account/number/list" element={<AccountNumberList />}/>
              <Route path="list/desinger" element={<DesingerList />}/>
              <Route path="write/ClosedDays" element={<DesingerClosedDays />}/>
              <Route path="reservation/" element={<BusinessReservation />}/>
              <Route path="reservation/desinger" element={<ReservationDesinger />}/>
              
            </Route>
          </Routes>
        </ImageProvider>
      </div>
    </div>
  );
}

export default App;