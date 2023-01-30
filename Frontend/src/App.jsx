import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { Provider } from "react-redux";
import store from "./store/store";
import AppHeader from "./components/AppHeader";
import LoginForm from "./pages/LoginForm";
import RegistForm from "./pages/RegistForm";
import FindPassForm from "./pages/FindPassForm";
import AppFooter from "./components/AppFooter";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SpectPage from "./pages/SpectPage";
import PlayPage from "./pages/PlayPage";
import NoticeBoard from "./pages/NoticeBoard";
import FreeBoard from "./pages/FreeBoard";
import ReportBoard from "./test2/ReportBoard";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Box>
      <Provider store={store}>
        <AppHeader />
      </Provider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <Provider store={store}>
              <LoginForm />
            </Provider>
          }
        />
        <Route path="/regist" element={<RegistForm />} />
        <Route path="/findPass" element={<FindPassForm />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/spect" element={<SpectPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/noticeBoard" element={<NoticeBoard />} />
        <Route path="/freeBoard" element={<FreeBoard />} />
        <Route path="/reportBoard" element={<ReportBoard />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <AppFooter />
    </Box>
  );
}

export default App;
