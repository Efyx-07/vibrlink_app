import FormContainer from '@/components/Shared/Forms/FormContainer';
import LoginForm from './LoginForm';
import FormPagesWording from '@/components/Shared/FormPageWording';
import StyledSeparator from '@/components/Shared/Separator/StyledSeparator';

export default function Login() {
  return (
    <div className="wording-and-form">
      <FormPagesWording
        mainTextPrimary="Happy"
        mainTextSecondary="to see you again"
        subText="Login to your account and manage all your vibrlinks or just create a new one !"
      />
      <StyledSeparator icon="game-icons:brain-freeze" />
      <FormContainer
        addedLinkLabel="I forgot my password"
        addedLinkPath="/vl/account/reset-password/ask"
        isJustifyCenter
      >
        <LoginForm />
      </FormContainer>
    </div>
  );
}
