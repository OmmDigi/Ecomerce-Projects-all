import { MainNav } from "./MainNav";
import { TopBar } from "./TopBar";

export function Header() {
  return (
    <>
      <div className="w-full">
        <TopBar />
      </div>

      <header className="sticky top-0 z-50 self-start">
        <MainNav />
      </header>
    </>
  );
}
