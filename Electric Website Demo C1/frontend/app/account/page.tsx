import Link from "next/link";
import IsAuthenticated from "../middleware/IsAuthenticated";
import OrderTab from "../component/Account/OrdersTab";
import { LogOut, MapPinned, Package2 } from "lucide-react";
import { TrackOrder } from "../component/Account/TrackOrder";
import LogoutButton from "../component/Account/LogoutButton";

const tabs = [
  {
    id: 1,
    name: "Orders",
    tab: "order",
    icon: <Package2 size={18} strokeWidth={1.5} />,
  },
  {
    id: 2,
    name: "Track Order",
    tab: "track",
    icon: <MapPinned size={18} strokeWidth={1.5} />,
  },
];

interface IProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function page({ searchParams }: IProps) {
  const queryParams = await searchParams;
  return (
    <>
      <main className="*:font-open">
        <section className="w-full py-10 bg-gray-100">
          <div className="container mx-auto px-4 space-y-3.5 flex items-center justify-center flex-col">
            <h3 className="text-3xl font-bold font-open tracking-wide">
              Account
            </h3>
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm text-[#666]">
              <Link href={"/"}>Home</Link>
              <span>/</span>
              <Link href={"/account"}>Account</Link>
            </div>
          </div>
        </section>

        <IsAuthenticated>
          <section className="container mx-auto py-10 space-y-10">
            <h2 className="font-bold text-2xl px-4">
              Hello, New Gupta welcome to your dashboard!
            </h2>

            <div className="flex items-start md:flex-row lg:flex-row flex-col gap-x-16 gap-y-10">
              {/* tabs */}
              <ul className="space-y-3 px-4 pt-1.5 sticky top-16 md:top-20 lg:top-20 bg-white self-start flex gap-1.5 max-w-full overflow-x-auto *shrink-0 md:*shrink lg:*shrink md:block lg:block">
                {tabs.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      href={`?tab=${item.tab}`}
                      className={`${
                        (queryParams.tab === undefined && index == 0) ||
                        queryParams.tab === item.tab
                          ? "bg-black text-white "
                          : "border border-black"
                      } border flex items-center text-nowrap gap-3.5 text-sm border-black font-inter! tracking-widest rounded-md py-2 px-5`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}

                <li>
                  <LogoutButton className="border w-full flex items-center text-nowrap gap-3.5 text-sm border-black font-inter! tracking-widest rounded-md py-2 px-5">
                    <LogOut size={18} strokeWidth={1.5} />
                    Logout
                  </LogoutButton>
                </li>
              </ul>

              <div className="flex-1 px-4">
                {queryParams.tab == undefined || queryParams.tab == "order" ? (
                  <OrderTab />
                ) : queryParams.tab == "track" ? (
                  <TrackOrder />
                ) : null}
              </div>
            </div>
          </section>
        </IsAuthenticated>

        {/* Account
        <Button onClick={() => localStorage.clear()}>Logout</Button> */}
      </main>
    </>
  );
}
