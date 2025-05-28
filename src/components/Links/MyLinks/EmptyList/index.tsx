import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Shared/Button';

export default function EmptyList() {
  const router = useRouter();

  return (
    <div className="flex h-screen-minus-18 w-full flex-col justify-center items-center gap-8">
      <div className="max-w-64">
        <Image
          src="/svg/empty-list.svg"
          width={500}
          height={500}
          alt="empty list"
          priority
        />
      </div>
      <p>You have no link yet !</p>
      <div className="w-full max-w-80">
        <Button
          type="button"
          label="Create a new link"
          onButtonClick={() => router.push('/vl/links/new-link')}
        />
      </div>
    </div>
  );
}
