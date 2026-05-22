import Image from "next/image";

export default function PreloaderScreen() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-[#053628] px-6 text-white"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-7">
        <div className="relative flex h-58 w-58 items-center justify-center rounded-full border border-white/15 bg-[#053628] shadow-black/25">
          <span className="preloader-ring absolute inset-[-10px] rounded-full border-2 border-transparent border-t-[#c9903f] border-r-[#c9903f]" />
          <Image
            src="/varanchi_logo.png"
            alt="Varanchi"
            width={150}
            height={42}
            priority
            className="h-18 w-full"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-questrial text-sm uppercase tracking-[0.34em] text-[#f1dfc0]">
            PAHANAVA
          </p>
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="preloader-dot" />
            <span className="preloader-dot preloader-dot-delay-1" />
            <span className="preloader-dot preloader-dot-delay-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
