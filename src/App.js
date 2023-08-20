import { GlobalStyles } from "./styles/globalStyle";

import { ThemeProvider } from "styled-components";
import { UseThemes } from "./Components/GlobalContextFolder/MyThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router";
import Homepage from "./Pages/Homepage";
import Userpage from "./Pages/Userpage";

const App = () => {
  const { theme } = UseThemes();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userpage" element={<Userpage />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
