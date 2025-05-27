import FormContainer from '@/components/Shared/Forms/FormContainer';
import ResetPasswordAskForm from './ResetPasswordAskForm';

export default function ResetPasswordAsk() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer
        addedLinkLabel="Back to sign in"
        addedLinkPath="/vl/account/login"
      >
        <ResetPasswordAskForm />
      </FormContainer>
    </div>
  );
}
