import './scss/index.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/Provider/RegisterPage';
import JobPostPage from './Pages/Provider/JobPostPage';
import JobHistoryPage from './Pages/Provider/JobHistoryPage';
import ProfilePage from './Pages/Provider/ProfilePage';
import CandidateHomePage from './Pages/User/CandidateHomePage';
import CandidateHistoryPage from './Pages/User/CandidateHistoryPage';
import DetailPage from './Pages/Provider/DetailPage';
import JobFullView from './Pages/User/JobFullView';
import { createContext, useState } from 'react';
import PageWrapper from './Components/Common/PageWrapper';
import PageNotFound from './Pages/PageNotFound';

export const NavbarContext = createContext()


function App() {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="main">
      <NavbarContext.Provider value={{ setShowNav, showNav }} >
        <Router>
          <PageWrapper>
            <Routes>
              {/* PROVIDER */}
              <Route path='/provider' element={<JobPostPage />} />
              <Route path='/register' Component={RegisterPage} />
              <Route path='/provider/job-history' element={<JobHistoryPage />} />
              <Route path='/provider/job-history/detail' element={<DetailPage />} />
              <Route path='/provider/profile' element={<ProfilePage />} />

              {/* USER */}
              <Route path='/user' element={<CandidateHomePage />} />
              <Route path='/user/candidate-history' element={<CandidateHistoryPage />} />
              <Route path='/user/job-full-view' element={<JobFullView />} />

              {/* PageNotFound */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </PageWrapper>
        </Router>
      </NavbarContext.Provider>
    </div>
  );
}

export default App;