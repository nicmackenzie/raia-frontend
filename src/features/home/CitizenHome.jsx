import { useState } from 'react';
import { cn } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsFeed from './NewsFeed';
import Discover from './Discover';

const TABS = [
  { value: 'news-feed', label: 'News Feed' },
  { value: 'discover', label: 'Discover' },
];

function CitizenHome() {
  const [tab, selectedTab] = useState('news-feed');
  return (
    <>
      <div className="hidden lg:flex lg:gap-4 h-full">
        <div className="flex-1 ">
          <NewsFeed />
        </div>
        <Discover />
      </div>
      <div className="block lg:hidden py-2 h-fullrelative">
        <header className="flex gap-4 items-center text-center pb-2 border-b">
          {TABS.map(tb => (
            <div
              key={tb.value}
              role="tab"
              aria-selected={tb.value === tab}
              className={cn(
                'flex-shrink-0 grow pb-2 transition border-b border-transparent',
                {
                  'border-b-primary': tab === tb.value,
                }
              )}
              onClick={() => selectedTab(tb.value)}
            >
              {tb.label}
            </div>
          ))}
        </header>
        {tab === 'news-feed' ? <NewsFeed /> : <Discover />}
        {/* <Link
          to="/feed"
          className="w-10 h-10 bg-primary/20 absolute bottom-20 right-2 rounded-full z-20 flex items-center justify-center"
        >
          <span>
            <Plus className="w-4 h-4 text-primary" />
          </span>
        </Link> */}
      </div>
    </>
  );
}

export default CitizenHome;
