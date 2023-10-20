// import CitizenProfile from "../features/profile/CitizenProfile.jsx"; 
import LeaderProfile from "../features/profile/LeaderProfile.jsx"
import { useUser } from "../features/authentication/use-user.js";
import CitizenProfile from "../features/profile/CitizenProfile.jsx";

function Profile() {
  const { data } = useUser();
  const role = data?.user_metadata?.role.toLowerCase();
  
  return (
    <div>
      {role === "citizen"? <CitizenProfile/> : <LeaderProfile />}
    </div>
  ) ;
}

export default Profile;
