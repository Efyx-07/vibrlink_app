import FormContainer from '../../Shared/Forms/FormContainer';
import SignupForm from './SignupForm';

export default function Signup() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer
        addedLinkLabel="Already have an account ? Sign in"
        addedLinkPath="/vl/account/login"
      >
        <SignupForm />
      </FormContainer>
    </div>
  );
}
