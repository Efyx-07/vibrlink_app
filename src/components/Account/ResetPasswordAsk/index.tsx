import FormContainer from '@/components/Shared/Forms/FormContainer';
import ResetPasswordAskForm from './ResetPasswordAskForm';
import FormPagesWording from '@/components/Layout/FormPageWording';
import StyledSeparator from '@/components/Shared/Separator/StyledSeparator';

export default function ResetPasswordAsk() {
  return (
    <div className="wording-and-form">
      <FormPagesWording
        mainTextPrimary="Oops !"
        mainTextSecondary="it seems you forgot your password"
        subText="Don't worry, if your email exists in our database, we'll send you a reset link to choose another one !"
      />
      <StyledSeparator icon="emojione-monotone:face-screaming-in-fear" />
      <FormContainer
        addedLinkLabel="Back to sign in"
        addedLinkPath="/vl/account/login"
        isJustifyCenter
      >
        <ResetPasswordAskForm />
      </FormContainer>
    </div>
  );
}
