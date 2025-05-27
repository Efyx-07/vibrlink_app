import FormContainer from '@/components/Shared/Forms/FormContainer';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPassword() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer>
        <ResetPasswordForm />
      </FormContainer>
    </div>
  );
}
