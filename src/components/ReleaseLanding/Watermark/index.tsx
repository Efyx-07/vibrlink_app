import { openInANewTab } from '@/utils/openInANewTab';
import { appUrl, siteName } from '@/constant';

export default function Watermark() {
  return (
    <div className="my-2 flex w-full items-center justify-center bg-whiteLight py-4 text-sm xl:bg-transparent">
      <p className="font-extralight">
        Create yours on{' '}
        <span
          className="cursor-pointer font-semibold hover:text-accentColor"
          onClick={() => openInANewTab(`${appUrl}`)}
        >
          {siteName}
        </span>
      </p>
    </div>
  );
}
