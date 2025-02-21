import Join from "./BusinessPage/join/Join";
import { Link, Route, Router, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./CSS/total.css";
// import './BusinessCSS/page.css';
// import './BusinessCSS/main.css';
import "./BusinessFont/font.css";
// import './CSS/components.css';
import Login from "./BusinessPage/login/LoginPage";
import BusinessMenu from "./BusinessPage/menu/MenuPage";
import { useState } from "react";
import LoginPage from "./Page/Login/LoginPage";
import RegisterInformation from "./BusinessPage/information/business/Registerinformation";
import { ImageProvider } from "./Contexts/ImageContext";
import ImgUpload from "./BusinessPage/common/ImgUpload";
import Redirection from "./Page/Login/Redirection";
import LoginSuccess from "./Page/Login/LoginSuccessPage";
import UserDetailPage from "./Page/User/UserDetailPage";
import HomePage from "./Page/Home/HomePage";
import ListPage from "./Page/List/ListPage";
import BusinessDetailPage from "./Page/List/BusinessDetailPage";
import RegisterDesinger from "./BusinessPage/information/desinger/RegisterDesinger";
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
import AuthorityManagement from "./BusinessPage/management/authority/AuthorityManagement";
import UserInformation from "./Page/User/UserInformation";
import RegisterStyle from "./BusinessPage/information/significant/RegisterStyle";
import ReservationManagement from "./BusinessPage/management/reservation/ReservationManagement";
import BusinessReservationDetail from "./BusinessPage/information/reservation/ReservationDetail";
import CustomerManagement from "./BusinessPage/management/customer/CustomerManagement";
import WriteNotice from "./BusinessPage/management/customer/WriteNotice";
import SelectedDatePage from "./Page/Reservation/SelectedDatePage";
import EditAddressPage from "./Page/User/EditAddressPage";
import UserEdit from "./Page/User/UserEdit";
import Reservation from "./Page/MyPage/Reservation";
import DateRegister from "./BusinessPage/information/date/DateRegister";
import DateEdit from "./BusinessPage/information/date/DateEdit";
import DayOnOffEdit from "./BusinessPage/information/date/DayOnOffEdit";
import EditInformation from "./BusinessPage/information/business/EditInformation";
import BusinessBeautyEditOption from "./BusinessPage/information/option/BusinessBeautyEditOption";
import ReservationDetail from "./Page/MyPage/ReservationDetail";
import AccountNumber from "./BusinessPage/information/account/AccountNumber";
import Notice from "./Page/MyPage/Notice";
import NoticeDetail from "./Page/MyPage/NoticeDetail";
import DesingerList from "./BusinessPage/information/desinger/DesingerList";
import DesingerClosedDays from "./BusinessPage/information/desinger/DesingerClosedDays";
import Authority from "./Page/User/Authority";
import BusinessReservation from "./BusinessPage/information/reservation/Reservation";
import ReservationDesinger from "./BusinessPage/information/reservation/ReservationDesinger";
import AccountNumberList from "./BusinessPage/information/account/AccountNumberList";
import Tos from "./Page/Home/tos";
import Privacy from "./Page/Home/privacy";
import CustomerManagementDetail from "./BusinessPage/management/customer/CustomerManagementDetail";
import HomeGuideDetail from "./Page/Home/homeGuideDetail";

import MasterLogin from "./master/masterLogin";
import MasterMain from "./master/masterMain";
import MasterJoin from "./master/masterJoin";
function App() {
  const location = useLocation();
  const isMasterPage = location.pathname.startsWith("/master");

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

  return (
    <>
      {isMasterPage ? (
        // 마스터 페이지는 독립적인 구조로 렌더링
        <Routes>
          <Route path="/master">
            <Route path="" element={<MasterLogin />} />
            <Route path="main" element={<MasterMain />} />
            <Route path="register" element={<Join />} />
          </Route>
        </Routes>
      ) : (
        <div className="App">
          <div className="Container">
            <ImageProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/*" element={<Redirection />} />
                <Route path="/login/success" element={<LoginSuccess />} />
                <Route path="/user/detail" element={<UserDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/list/:id" element={<ListPage />} />
                <Route
                  path="/business/detail/:id"
                  element={<BusinessDetailPage />}
                />
                <Route path="/designer/list" element={<PetDesigner />} />
                <Route path="/select/date/:id" element={<SelectDatePage />} />
                <Route
                  path="/pet/registration"
                  element={<PetRegistrationPage />}
                />
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
                <Route
                  path="/selected/date/:id"
                  element={<SelectedDatePage />}
                />
                <Route path="/edit-address" element={<EditAddressPage />} />
                <Route path="/user/edit" element={<UserEdit />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/tos" element={<Tos />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/guide_detail" element={<HomeGuideDetail />} />
                <Route
                  path="/reservation/detail/:id"
                  element={<ReservationDetail />}
                />

                <Route path="/notice" element={<Notice />} />
                <Route path="/notice/:id" element={<NoticeDetail />} />
                <Route path="/authority/management" element={<Authority />} />

                <Route path="/business">
                  <Route path="login" element={<Login />} />
                  <Route path="menu" element={<BusinessMenu />} />
                  <Route path="register" element={<Join />} />
                  <Route
                    path="register/information"
                    element={<RegisterInformation />}
                  />
                  <Route
                    path="edit/information"
                    element={<EditInformation />}
                  />
                  <Route
                    path="imgupload/:pathName/:imageType"
                    element={<ImgUpload setImageFiles={handleSetImageFiles} />}
                  />
                  <Route
                    path="register/desinger"
                    element={<RegisterDesinger />}
                  />
                  <Route
                    path="authority/management"
                    element={<AuthorityManagement />}
                  />
                  <Route path="register/style" element={<RegisterStyle />} />
                  <Route
                    path="reservation/management"
                    element={<ReservationManagement />}
                  />
                  <Route
                    path="reservation/detail"
                    element={<BusinessReservationDetail />}
                  />
                  <Route
                    path="customer/management"
                    element={<CustomerManagement />}
                  />
                  <Route
                    path="customer/management/detail"
                    element={<CustomerManagementDetail />}
                  />
                  <Route path="write/notice" element={<WriteNotice />} />
                  <Route path="date/register" element={<DateRegister />} />
                  <Route path="date/edit" element={<DateEdit />} />
                  <Route path="day-on-off/edit" element={<DayOnOffEdit />} />
                  <Route
                    path="edit/option"
                    element={<BusinessBeautyEditOption />}
                  />
                  <Route path="account/number" element={<AccountNumber />} />
                  <Route
                    path="account/number/list"
                    element={<AccountNumberList />}
                  />
                  <Route path="list/desinger" element={<DesingerList />} />
                  <Route
                    path="write/ClosedDays"
                    element={<DesingerClosedDays />}
                  />
                  <Route path="reservation" element={<BusinessReservation />} />
                  <Route
                    path="reservation/desinger"
                    element={<ReservationDesinger />}
                  />
                </Route>
              </Routes>
            </ImageProvider>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
