import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import AppHeader from "./components/AppHeader";
import LoginForm from "./pages/TokenLoginForm";
import RegistForm from "./pages/RegistForm";
import FindPassForm from "./pages/FindPassForm";
import AppFooter from "./components/AppFooter";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SpectPage from "./pages/SpectPage";
// import PlayPage from "./pages/PlayPage";
import NewPlayPage from "./pages/NewPlayPage";
import NewPlayPage2 from "./pages/NewPlayPage2";
import EmergencyPlay from "./pages/EmergencyPlay";
import EmergencyPlay2 from "./pages/EmergencyPlay2";
// import PlayPage2 from "./pages/PlayPage2";
import NoticeBoard from "./pages/noticeboard/NoticeBoard";
import NoticeBoardDetail from "./pages/noticeboard/NoticeBoardDetail";
import NoticeBoardWrite from "./pages/noticeboard/NoticeBoardWrite";
import NoticeBoardModify from "./pages/noticeboard/NoticeBoardModify";
import FreeBoard from "./pages/freeboard/FreeBoard";
import FreeBoardDetail from "./pages/freeboard/FreeBoardDetail";
import FreeBoardWrite from "./pages/freeboard/FreeBoardWrite";
import FreeBoardModify from "./pages/freeboard/FreeBoardModify";
import ReportBoard from "./pages/reportboard/ReportBoard";
import ReportBoardWrite from "./pages/reportboard/ReportBoardWrite";
import ReportBoardModify from "./pages/reportboard/ReportBoardModify";
import ReportBoardDetail from "./pages/reportboard/ReportBoardDetail";
import AuthPage from "./pages/AuthPage";
import PlayRoom2 from "./test/PlayRoom2";
import PlayRoom3 from "./test/PlayRoom3";
import Auth from "./pages/Auth";
import AuthAdmin from "./pages/AuthAdmin";
import AuthPlayer from "./pages/AuthPlayer";

// const SpectPageWithAuth = Auth(SpectPage);
const SpectPageWithAuth = Auth(SpectPage);
// const PlayPageWithAuth = Auth(PlayPage);
const NewPlayPageWithAuth = AuthPlayer(NewPlayPage);
const NewPlayPage2WithAuth = AuthPlayer(NewPlayPage2);
// const PlayPage2WithAuth = Auth(PlayPage2);
const NoticeBoardDetailWithAuth = Auth(NoticeBoardDetail);
const NoticeBoardWriteWithAuth = AuthAdmin(NoticeBoardWrite);
const FreeBoardDetailWithAuth = Auth(FreeBoardDetail);
const FreeBoardWriteWithAuth = Auth(FreeBoardWrite);
const ReportBoardDetailWithAuth = Auth(ReportBoardDetail);
const ReportBoardWriteWithAuth = Auth(ReportBoardWrite);

function App() {
  return (
    <Box>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<PlayRoom2 />} />
        <Route path="/about2" element={<PlayRoom3 />} />
        <Route path="/regist" element={<RegistForm />} />
        <Route path="/findPass" element={<FindPassForm />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/spect" element={<SpectPageWithAuth />} />
        {/* <Route path="/play/1" element={<PlayPageWithAuth />} /> */}
        <Route path="/play/1" element={<NewPlayPageWithAuth />} />
        <Route path="/play/2" element={<NewPlayPage2WithAuth />} />
        <Route path="/play/1/1" element={<EmergencyPlay />} />
        <Route path="/play/2/2" element={<EmergencyPlay2 />} />
        {/* <Route path="/play/2" element={<PlayPage2WithAuth />} /> */}
        <Route path="/freeBoard" element={<FreeBoard />} />
        <Route path="/freeBoard/detail" element={<FreeBoardDetailWithAuth />} />
        <Route path="/freeBoard/write" element={<FreeBoardWriteWithAuth />} />
        <Route path="/freeBoard/modify" element={<FreeBoardModify />} />
        <Route path="/reportBoard" element={<ReportBoard />} />
        <Route
          path="/reportBoard/write"
          element={<ReportBoardWriteWithAuth />}
        />
        <Route path="/reportBoard/modify" element={<ReportBoardModify />} />
        <Route
          path="/reportBoard/detail"
          element={<ReportBoardDetailWithAuth />}
        />
        <Route path="/noticeBoard" element={<NoticeBoard />} />
        <Route
          path="/noticeBoard/detail"
          element={<NoticeBoardDetailWithAuth />}
        />
        <Route
          path="/noticeBoard/write"
          element={<NoticeBoardWriteWithAuth />}
        />
        <Route path="/noticeBoard/modify" element={<NoticeBoardModify />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
      </Routes>
      <AppFooter />
    </Box>
  );
}

export default App;
