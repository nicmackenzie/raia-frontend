import { Outlet } from 'react-router-dom';
import CitizenAside from './CitizenAside';
import CitizenHeader from './CitizenHeader';
import CitizenRightSidebar from './CitizenRightSidebar';
function CitizenLayout() {
  return (
    <>
      <CitizenHeader />
      <div className="h-[calc(100dvh-4rem)] flex flex-col lg:flex-row lg:gap-8 md:p-2 ">
        <CitizenAside />
        <main className=" flex-1 px-4 md:px-6">
          <Outlet />
        </main>
        <CitizenRightSidebar />
        <nav className="bg-blue-400 lg:hidden mt-auto h-16 justify-self-end">
          asd
        </nav>
      </div>
      {/* <nav className="bg-blue-400">asd</nav> */}
    </>
  );
}

export default CitizenLayout;
