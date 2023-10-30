import { Outlet } from 'react-router-dom';
import CitizenAside from './CitizenAside';
import CitizenHeader from './CitizenHeader';
import CitizenRightSidebar from './CitizenRightSidebar';
import { CITIZEN_NAV_FOOTER } from './constants';
import CitizenFooter from './CitizenFooter';

function CitizenLayout({ onOpen }) {
  return (
    <>
      <CitizenHeader onOpen={onOpen} />
      <div className="h-[calc(100dvh-4rem)] flex flex-col lg:flex-row lg:gap-8 md:p-2 ">
        <CitizenAside />
        <main className=" flex-1 px-4 md:px-6">
          <Outlet />
        </main>
        <CitizenRightSidebar />
        <nav className="fixed bottom-0 w-full bg-white shadow-md border-t lg:hidden h-16 py-2 px-2 flex">
          <ul className="flex items-center justify-around w-full">
            {CITIZEN_NAV_FOOTER.map(item => (
              <CitizenFooter key={item.label} {...item} />
            ))}
          </ul>
        </nav>
      </div>
      {/* <nav className="bg-blue-400">asd</nav> */}
    </>
  );
}

export default CitizenLayout;
