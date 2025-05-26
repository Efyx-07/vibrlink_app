import FormContainer from '@/components/Shared/Forms/FormContainer';
import UpdatePasswordForm from './UpdatePasswordForm';

export default function Settings() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer>
        <UpdatePasswordForm />
      </FormContainer>
    </div>
  );
}
