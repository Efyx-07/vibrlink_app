import FormContainer from '@/components/Shared/Forms/FormContainer';
import NewLinkForm from './NewLinkForm';
import FormPagesWording from '@/components/Shared/FormPageWording';
import StyledSeparator from '@/components/Shared/Separator/StyledSeparator';

export default function NewLink() {
  return (
    <div className="wording-and-form">
      <FormPagesWording
        mainTextPrimary="Start"
        mainTextSecondary="by entering your release Spotify link"
        subText="It will automatically generate a new vibrlink with the Spotify, Deezer and YouTube links. Let's go !"
      />
      <StyledSeparator icon="ph:music-notes-simple-fill" />
      <FormContainer isJustifyCenter>
        <NewLinkForm />
      </FormContainer>
    </div>
  );
}
