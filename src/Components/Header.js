import AccountCircle from "./AcountCircle";
import typing_logo from "../Images/keyboad-user.jpg";

const Headers = () => {
  return (
    <div className="Header">
      <div className="logo">
        <div className="logo-typing">
          <img src={typing_logo} alt="" />
        </div>
        <strong>TypingSpeedBooster</strong>
      </div>
      <div className="icon-logo">
        <AccountCircle />
      </div>
    </div>
  );
};
export default Headers;
