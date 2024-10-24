import MainLayout from './components/layouts/MainLayout';
import PlayTicketingPage from './pages/PlayTicketingPage';
import AuthProviderWrapper from './remotes/AuthProviderWrapper';
import TicketProvider from './stores/ticket';

export default function App() {
  return (
    <AuthProviderWrapper>
      <TicketProvider>
        <MainLayout>
          <PlayTicketingPage />
        </MainLayout>
      </TicketProvider>
    </AuthProviderWrapper>
  );
}
