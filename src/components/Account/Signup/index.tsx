import FormContainer from '../../Shared/Forms/FormContainer';
import SignupForm from './SignupForm';
import FormPagesWording from '@/components/Shared/FormPageWording';
import StyledSeparator from '@/components/Shared/Separator/StyledSeparator';

export default function Signup() {
  return (
    <div className="wording-and-form">
      <FormPagesWording
        mainTextPrimary="Create"
        mainTextSecondary="a free account"
        subText="Let's get started and enjoy using our service by creating your account. It's free !"
      />
      <StyledSeparator icon="simple-icons:freepik" />
      <FormContainer
        addedLinkLabel="Already have an account ? Sign in"
        addedLinkPath="/vl/account/login"
      >
        <SignupForm />
      </FormContainer>
    </div>
  );
}
