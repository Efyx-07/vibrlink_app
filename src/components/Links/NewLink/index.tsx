import FormContainer from '@/components/Shared/Forms/FormContainer';
import NewLinkForm from './NewLinkForm';

export default function NewLink() {
  return (
    <div className="flex w-full items-center justify-center">
      <FormContainer>
        <NewLinkForm />
      </FormContainer>
    </div>
  );
}
