import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthProviderWrapper from './remotes/AuthProviderWrapper';
import MainLayout from './components/layouts/MainLayout';
import LoginPageWrapper from './remotes/LoginPageWrapper';
import SignupPageWrapper from './remotes/SignupPageWrapper';
import OwnerPageWrapper from './remotes/OwnerPageWrapper';
import TemplatePageWrapper from './remotes/TemplatePageWrapper';
import PlayDetailPageWrapper from './remotes/PlayDetailPageWrapper';
import DeployConcertPageWrapper from './remotes/DeployConcertPageWrapper';
import ServerMonitorPageWrapper from './remotes/ServerMonitorPageWrapper';
import PlayConfigurationPageWrapper from './remotes/PlayConfigurationPageWrapper';
import MyTicketPageWrapper from './remotes/MyTicketPageWrapper';
import PlayMonitorPageWrapper from './remotes/PlayMonitorPageWrapper';
import ProviderRouteWrapper from './remotes/ProviderRouteWrapper';
import CustomerRouteWrapper from './remotes/CustomerRouteWrapper';

export default function App() {
  return (
    <AuthProviderWrapper>
      <BrowserRouter basename="/page/main">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="/play/:pid" element={<PlayDetailTicketingPage />} /> */}

            {/* Need Provider Authentication */}
            <Route element={<ProviderRouteWrapper />}>
              {/* Deployment */}
              <Route
                path="/owner"
                element={<OwnerPageWrapper />}
              />
              <Route
                path="/owner/deploy"
                element={<TemplatePageWrapper />}
              />

              {/* Deployment Template */}
              <Route path="/owner/deploy/:templateName" element={<DeployConcertPageWrapper />} />

              {/* Play Detail */}
              <Route
                path="/owner/playDetail/:namespace"
                element={<PlayDetailPageWrapper />}
              />
              <Route path="/owner/playMonitor/:namespace" element={<PlayMonitorPageWrapper />} />
              <Route path="/owner/serverMonitor/:namespace" element={<ServerMonitorPageWrapper />} />
              <Route path="/owner/playConfiguration/:namespace" element={<PlayConfigurationPageWrapper />} />
            </Route>

            {/* Need Customer Authentication */}
            <Route element={<CustomerRouteWrapper />}>
              {/* My Ticket */}
              <Route path="/myTicket" element={<MyTicketPageWrapper />} />
            </Route>
          </Route>
          {/* Authentication */}
          <Route
            path="/login"
            element={<LoginPageWrapper />}
          />
          <Route
            path="/signup"
            element={<SignupPageWrapper />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProviderWrapper>
  );
}
