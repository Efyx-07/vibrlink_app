import AccountFormContainer from '@/components/Shared/Forms/AccountFormContainer';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="flex w-full items-center justify-center">
      <AccountFormContainer
        addedLinkLabel="I forgot my password"
        addedLinkPath="/vl/account/reset-password-ask"
      >
        <LoginForm />
      </AccountFormContainer>
    </div>
  );
}
