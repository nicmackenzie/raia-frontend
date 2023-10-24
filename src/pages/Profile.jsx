// import CitizenProfile from "../features/profile/CitizenProfile.jsx";
import LeaderProfile from '../features/profile/LeaderProfile.jsx';
import { useUser } from '../features/authentication/use-user.js';
import CitizenProfile from '../features/profile/CitizenProfile.jsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/Tab.jsx';
import ProfileBox from '../features/profile/ProfileBox.jsx';
import SecurityForm from '../features/profile/SecurityForm.jsx';

function Profile() {
  const { data } = useUser();
  const role = data?.user_metadata?.role.toLowerCase();

  return (
    <div className=" mx-4">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileBox />
        </TabsContent>
        <TabsContent value="security">
          <SecurityForm />
        </TabsContent>
      </Tabs>
    </div>
    // <div>
    //   {role === "citizen"? <CitizenProfile/> : <LeaderProfile />}
    // </div>
  );
}

export default Profile;
