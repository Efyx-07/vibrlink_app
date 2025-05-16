import AccountFormContainer from '../../Shared/Forms/AccountFormContainer';
import SignupForm from './SignupForm';

export default function Signup() {
  return (
    <div>
      <AccountFormContainer
        addedLinkLabel="Already have an account ? Sign in"
        addedLinkPath="/vl/account/login"
      >
        <SignupForm />
      </AccountFormContainer>
    </div>
  );
}
