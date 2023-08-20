import { themeOptions } from "../Utils/themeOptions";
import Select from "react-select";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavLink } from "react-router-dom";
const Footer = () => {
  const { setTheme, theme } = UseThemes();

  const HandleChange = (event) => {
    setTheme(event.value);

    localStorage.setItem("theme", JSON.stringify(event.value));
  };

  return (
    <div className="footer">
      <div className="Links">
        <div className="Github">
          <NavLink to={"https://github.com//Fayeemahmad398"}>
            <GitHubIcon className="contact-icons" />
          </NavLink>
        </div>
        <div className="Linkedin">
          <NavLink to={"https://www.linkedin.com/in/fayeem-ahmad398/"}>
            <LinkedInIcon className="contact-icons" />
          </NavLink>
        </div>
      </div>
      <div className="themeButtons">
        <Select
          onChange={HandleChange}
          placeholder="Themes"
          options={themeOptions}
          menuPlacement="top"
          styles={{
            control: (baseStyle) => {
              return {
                ...baseStyle,
                background: theme.background,
                border: `1px solid ${theme.color}`,
                outline: "none",
                width: "120px",
              };
            },

            menu: (baseStyle) => {
              return {
                ...baseStyle,
                background: theme.background,
                border: `1px solid ${theme.color}`,
              };
            },

            option: (baseStyle, state) => {
              return {
                ...baseStyle,
                cursor: "pointer",
                color: !state.isFocused ? theme.color : theme.background,
                background: state.isFocused ? theme.color : theme.background,
              };
            },
            placeholder: (baseStyle) => {
              return {
                ...baseStyle,
                color: `${theme.color}`,
              };
            },
            singleValue: (baseStyle) => {
              return {
                ...baseStyle,
                color: `${theme.color}`,
              };
            },
          }}
        />
      </div>
    </div>
  );
};
export default Footer;
