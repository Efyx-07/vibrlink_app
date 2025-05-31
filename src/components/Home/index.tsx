'use client';

import Button from '../Shared/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="title-clamp font-bold leading-tight">
          Hey, it&apos;s the <span className="text-accentColor">big day </span>!
          <br />
          Ready to share your new music ?
        </h1>
        <p className="text-lg font-extralight md:text-xl">
          As a musician, we know how special this day is and how exciting it is
          to share your new release with your fan community. Let&apos;s do it !
        </p>
      </div>
      <Button
        type="button"
        label="Create a free account"
        isLoading={false}
        isMaxWidthLmited
        onButtonClick={() => router.push('/vl/account/signup')}
      />
    </div>
  );
}
