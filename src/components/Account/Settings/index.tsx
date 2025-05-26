import FormContainer from '@/components/Shared/Forms/FormContainer';
import UpdatePasswordForm from './UpdatePasswordForm';
import DeleteAccount from './DeleteAccount';
import HorizontalSeparator from '@/components/Shared/Separator/HorizontalSeparator';

export default function Settings() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer>
        <UpdatePasswordForm />
        <HorizontalSeparator />
        <DeleteAccount />
      </FormContainer>
    </div>
  );
}
