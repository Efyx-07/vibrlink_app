import Login from '@/components/Account/Login';
import PageWrapper from '@/components/Hoc/PageWrapper';

export default function LoginPage() {
  return (
    <PageWrapper isScrollingInside>
      <Login />
    </PageWrapper>
  );
}
