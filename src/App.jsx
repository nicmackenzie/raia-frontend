import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/ui/Loader';
import ProtectedRoute from './components/layout/ProtectedRoute';

const Authenication = lazy(() => import('./pages/Authentication'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
const Discussions = lazy(() => import('./pages/Discussions'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Messages = lazy(() => import('./pages/Messages'));
const News = lazy(() => import('./pages/NewsUpdates'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Petitions = lazy(() => import('./pages/Petitions'));
const PetitionDetail = lazy(() => import('./pages/PetitionDetail'));
const PollsAndSurveys = lazy(() => import('./pages/PollsAndSurveys'));
const Profile = lazy(() => import('./pages/Profile'));
const Resources = lazy(() => import('./pages/Resources'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Tickets = lazy(() => import('./pages/Tickets'));
const LeaderConfirmation = lazy(() => import('./pages/LeaderConfirmation'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <Suspense fallback={<Loader />}>
                <Authenication />
              </Suspense>
            }
          />
          <Route
            path="/leader-confirmation"
            element={
              <Suspense fallback={<Loader />}>
                <LeaderConfirmation />
              </Suspense>
            }
          />

          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute></ProtectedRoute>
              </Suspense>
            }
          >
            <Route index element={<Home />} />
            <Route path="discussions" element={<Discussions />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="messages" element={<Messages />} />
            <Route path="news-updates" element={<News />} />
            <Route path="news/:slug" element={<NewsDetail />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="petitions" element={<Petitions />} />
            <Route path="petitions/:slug" element={<PetitionDetail />} />
            <Route path="polls-surveys" element={<PollsAndSurveys />} />
            <Route path="my-profile" element={<Profile />} />
            <Route path="resources" element={<Resources />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="tickets" element={<Tickets />} />
          </Route>

          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;