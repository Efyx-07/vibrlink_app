import AccountFormContainer from '@/components/Shared/Forms/AccountFormContainer';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div>
      <AccountFormContainer
        addedLinkLabel="I forgot my password"
        addedLinkPath="/vl/account/reset-password-ask"
      >
        <LoginForm />
      </AccountFormContainer>
    </div>
  );
}
