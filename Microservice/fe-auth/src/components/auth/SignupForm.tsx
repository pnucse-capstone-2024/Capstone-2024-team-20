import Button from '../common/Button';
import TextInput from '../common/TextInput';
import styles from '../styles/SignupForm.module.css';

interface RegisterFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: React.FormEventHandler<HTMLFormElement>;
}

export default function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  userType,
  setUserType,
  handleRegister,
}: RegisterFormProps) {
  return (
    <div>
      <form
        className={styles.formContainer}
        onSubmit={handleRegister}
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
          <TextInput
            name="비밀번호 확인"
            value={confirmPassword}
            setValue={setConfirmPassword}
            secret
            required
          />
          <div className={styles.radioTitle}>회원 구분</div>
          <div className={styles.radioContainer}>
            <label
              className={styles.radioLabel}
              htmlFor="client"
            >
              <input
                type="radio"
                name="userType"
                id="client"
                value="CLIENT"
                checked={userType === 'CLIENT'}
                onChange={() => setUserType('CLIENT')}
              />
              예매자
            </label>
            <label
              className={styles.radioLabel}
              htmlFor="owner"
            >
              <input
                type="radio"
                name="userType"
                id="owner"
                value="PROVIDER"
                checked={userType === 'PROVIDER'}
                onChange={() => setUserType('PROVIDER')}
              />
              판매자
            </label>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
