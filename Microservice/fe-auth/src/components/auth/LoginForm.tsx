import Button from '../common/Button';
import TextInput from '../common/TextInput';
import styles from '../styles/LoginForm.module.css';

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: React.FormEventHandler<HTMLFormElement>;
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}: LoginFormProps) {
  return (
    <div>
      <form
        className={styles.formContainer}
        onSubmit={handleLogin}
      >
        <div className={styles.form}>
          <TextInput
            name="이메일"
            value={email}
            setValue={setEmail}
            required
          />
          <TextInput
            name="비밀번호"
            value={password}
            setValue={setPassword}
            secret
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
          >
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
