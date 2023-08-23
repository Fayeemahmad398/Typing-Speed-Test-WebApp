import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const UserInfo = ({ data }) => {
  const [user] = useAuthState(auth);

  const data1 = data.sort((a, b) => {
    return b.WPM - a.WPM;
  });
  let flag = true;

  return (
    <div className="user-info">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon className="profile-icon" />
        </div>
        <div className="info">
          <div className="email">{user.email} Joined On</div>
          <div className="joined-at">{user.metadata.creationTime}</div>
        </div>
      </div>
      <div className="total-tests">
        <p>
          <span>Total Tests:</span> <strong>{data.length}</strong>
        </p>

        {data1.length > 0 && (
          <p>
            <span>Best Score:</span> <strong>{data1[0].WPM}-WPM</strong>
          </p>
        )}
      </div>
    </div>
  );
};
export default UserInfo;
