import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/ui/Loader';
import ProtectedRoute from './components/layout/ProtectedRoute';
import EmailConfirmation from './pages/EmailConfirmation';
import AppLayout from './components/layout/AppLayout';
import { Toaster } from 'react-hot-toast';

// import { NotificationProvider } from './context/notifications-context';
// import CreateDiscussionForm from './features/discussions/CreateDiscussionForm';
// import DiscussonDetail from './features/discussions/DiscussonDetail';

const Authenication = lazy(() => import('./pages/Authentication'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
const Discussions = lazy(() => import('./pages/Discussions'));

const CreateDiscussionForm = lazy(() =>
  import('./features/discussions/CreateDiscussionForm')
);
const DiscussionDetail = lazy(() =>
  import('./features/discussions/DiscussionDetail')
);
// const Events = lazy(() => import('./pages/Events'));
const EventTest = lazy(() => import('./pages/EventsTest'));
const AddEditEvent = lazy(() => import('./features/events/EventForm'));
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
const Review = lazy(() => import('./pages/Review'));
const Tickets = lazy(() => import('./pages/Tickets'));
const LeaderConfirmation = lazy(() => import('./pages/LeaderConfirmation'));
const Verification = lazy(() => import('./pages/Verification'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const EventAttendees = lazy(() => import('./pages/EventAttendees'));
const EventEnquiries = lazy(() => import('./pages/EventEnquiries'));
const NewPetition = lazy(() => import('./pages/NewPetition'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

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
          <Route path="/email-confirmation" element={<EmailConfirmation />} />
          <Route path="/password-reset" element={<ResetPassword />} />
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
                <ProtectedRoute>
                  {/* <NotificationProvider> */}
                  <AppLayout />
                  {/* </NotificationProvider> */}
                </ProtectedRoute>
              </Suspense>
            }
          >
            <Route index element={<Home />} />
            <Route path="discussions" element={<Discussions />} />
            {/* <Route path="events" element={<Events />} /> */}
            <Route path="events" element={<EventTest />} />
            <Route path="events/new" element={<AddEditEvent />} />
            <Route path="events/:id" element={<EventDetail />} />

            <Route path="events/:id/attendees" element={<EventAttendees />} />
            <Route path="events/:id/enquiries" element={<EventEnquiries />} />
            <Route
              path="discussions/create"
              element={<CreateDiscussionForm />}
            />
            <Route path="discussions/:id" element={<DiscussionDetail />} />

            <Route path="messages" element={<Messages />} />
            <Route path="news-updates" exact element={<News />} />
            <Route path="news-updates/:id" element={<NewsDetail />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="petitions" element={<Petitions />} />
            <Route path="petitions/new" element={<NewPetition />} />
            <Route path="petitions/:slug" element={<PetitionDetail />} />
            <Route path="polls-surveys" element={<PollsAndSurveys />} />
            <Route path="my-profile" element={<Profile />} />
            <Route path="resources" element={<Resources />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="review/:username" element={<Review />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="profile/:username" element={<UserProfile />} />
          </Route>
          <Route
            path="verification"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <Verification />
                </ProtectedRoute>
              </Suspense>
            }
          />

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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'bg-background',
            color: 'text-foreground',
          },
        }}
      />
    </>
  );
}

export default App;
