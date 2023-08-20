import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const UserInfo = ({ data }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="user-info">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon  className="profile-icon"/>
        </div>
        <div className="info">
          <div className="email">{user.email} Joined On</div>
          <div className="joined-at">{user.metadata.creationTime}</div>
        </div>
      </div>
      <div className="total-tests">
        <span>Total Tests:</span> <strong>{data.length}</strong>
      </div>
    </div>
  );
};
export default UserInfo;
