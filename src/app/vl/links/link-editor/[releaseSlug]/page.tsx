import LinkEditor from '@/components/Links/LinkEditor';
import PageWrapper from '@/components/Hoc/PageWrapper';

export default function LinkEditorPage() {
  return (
    <PageWrapper isJustifyStart={true}>
      <LinkEditor />
    </PageWrapper>
  );
}
