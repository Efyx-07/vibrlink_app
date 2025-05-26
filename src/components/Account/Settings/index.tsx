import FormContainer from '@/components/Shared/Forms/FormContainer';
import UpdatePasswordForm from './UpdatePasswordForm';
import DeleteAccount from './DeleteAccount';

export default function Settings() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer>
        <div className="flex w-full flex-col gap-16">
          <UpdatePasswordForm />
          <DeleteAccount />
        </div>
      </FormContainer>
    </div>
  );
}
