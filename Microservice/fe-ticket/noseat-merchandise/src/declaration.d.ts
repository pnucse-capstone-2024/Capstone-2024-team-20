declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Auth
declare module 'auth/AuthProvider';
declare module 'auth/UserStatusBar';
