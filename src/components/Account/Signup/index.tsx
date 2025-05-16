import AccountFormContainer from '../../Shared/Forms/AccountFormContainer';
import SignupForm from './SignupForm';

export default function Signup() {
  return (
    <div className="flex w-full items-center justify-center">
      <AccountFormContainer
        addedLinkLabel="Already have an account ? Sign in"
        addedLinkPath="/vl/account/login"
      >
        <SignupForm />
      </AccountFormContainer>
    </div>
  );
}
