import { Outlet } from 'react-router-dom';
import LeaderNavBar from './LeaderNavBar';
import { ScrollArea } from '../ui/ScrollArea';
import LeaderSideBar from './LeaderSideBar';
import CitizenLayout from './CitizenLayout';
import { useUser } from '../../features/authentication/use-user';
import MobileNavLeader from './MobileNavLeader';
import MobileNavCitizen from './MobileNavCitizen';
import { useState } from 'react';

function AppLayout() {
  const { user } = useUser();

  const role = user?.role.toLowerCase();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function openSideBar() {
    setIsSidebarOpen(true);
  }
  function closeSideBar() {
    setIsSidebarOpen(false);
  }

  return (
    <div className="h-dvh bg-background">
      {role === 'citizen' || (role === 'leader' && !user?.verified) ? (
        <>
          {isSidebarOpen && (
            <MobileNavCitizen
              onClose={closeSideBar}
              isSidebarOpen={isSidebarOpen}
            />
          )}
          <CitizenLayout onOpen={openSideBar} />
        </>
      ) : (
        <>
          {isSidebarOpen && (
            <MobileNavLeader
              onClose={closeSideBar}
              isSidebarOpen={isSidebarOpen}
            />
          )}
          {/* <MobileNavLeader onClose={closeSideBar} /> */}
          <LeaderSideBar />
          <main className="lg:pl-72">
            <LeaderNavBar onOpen={openSideBar} />
            <ScrollArea className="h-[calc(100dvh-4rem)] ">
              <Outlet />
            </ScrollArea>
          </main>
        </>
      )}
    </div>
  );
}

export default AppLayout;
