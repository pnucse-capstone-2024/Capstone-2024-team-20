declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Auth
declare module 'auth/LoginPage';
declare module 'auth/SignupPage';
declare module 'auth/AuthProvider';
declare module 'auth/UserStatusBar';
declare module 'auth/PrivateRoute';
declare module 'auth/CustomerRoute';
declare module 'auth/ProviderRoute';

// Deploy
declare module 'deploy/OwnerPage';
declare module 'deploy/PlayDetailPage';
declare module 'deploy/TemplatePage';
declare module 'deploy/DeployConcertPage';
declare module 'deploy/PlayMonitorPage';
declare module 'deploy/ServerMonitorPage';
declare module 'deploy/PlayConfigurationPage'

// MyTicket
declare module 'myTicket/MyTicketPage';
