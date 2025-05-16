import FormContainer from '@/components/Shared/Forms/FormContainer';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer
        addedLinkLabel="I forgot my password"
        addedLinkPath="/vl/account/reset-password-ask"
      >
        <LoginForm />
      </FormContainer>
    </div>
  );
}
