import FormField from '@/components/FormField';

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-8">
      <FormField id="email" label="Email address" name="email" type="email" />
      <FormField
        id="password"
        label="Create a password"
        addedMention="8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
        name="password"
        type="password"
      />
      <FormField
        id="password-confirm"
        label="Confirm your password"
        addedMention="must be identical to your password"
        name="password-confirm"
        type="password"
      />
    </form>
  );
}
