import FormContainer from '@/components/Shared/Forms/FormContainer';
import ResetPasswordAskForm from './ResetPasswordAskForm';
import FormPagesWording from '@/components/Shared/FormPageWording';
import StyledSeparator from '@/components/Shared/Separator/StyledSeparator';

export default function ResetPasswordAsk() {
  return (
    <div className="wording-and-form">
      <FormPagesWording
        mainTextPrimary="Oops !"
        mainTextSecondary="it seems you forgot your password"
        subText="Login to your account and manage all your vibrlinks or just create a new one !"
      />
      <StyledSeparator icon="emojione-monotone:face-screaming-in-fear" />
      <FormContainer
        addedLinkLabel="Back to sign in"
        addedLinkPath="/vl/account/login"
      >
        <ResetPasswordAskForm />
      </FormContainer>
    </div>
  );
}
