import { Outlet } from 'react-router-dom';
import LeaderNavBar from './LeaderNavBar';
import { ScrollArea } from '../ui/ScrollArea';
import LeaderSideBar from './LeaderSideBar';

function AppLayout() {
  return (
    <div className="h-dvh bg-secondary">
      <LeaderSideBar />
      <main className=" lg:pl-72">
        <LeaderNavBar />
        <ScrollArea className="h-[calc(100dvh-4rem)] p-4 md:p-6 lg:px-8 lg:py-6">
          <Outlet />
        </ScrollArea>
      </main>
    </div>
  );
}

export default AppLayout;
