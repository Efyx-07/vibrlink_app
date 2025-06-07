import FormContainer from '@/components/Shared/Forms/FormContainer';
import UpdatePasswordForm from './UpdatePasswordForm';
import DeleteAccount from './DeleteAccount';
import FormPagesWording from '@/components/Layout/FormPageWording';
import StyledSeparator from '@/components/Shared/Separator/StyledSeparator';

export default function Settings() {
  return (
    <div className="wording-and-form">
      <FormPagesWording
        mainTextPrimary="Security"
        mainTextSecondary="first"
        subText="It seems you need to update your password, choose a unique one to improve your security !"
      />
      <StyledSeparator icon="game-icons:police-officer-head" />
      <FormContainer>
        <div className="flex w-full flex-col gap-16">
          <UpdatePasswordForm />
          <DeleteAccount />
        </div>
      </FormContainer>
    </div>
  );
}
