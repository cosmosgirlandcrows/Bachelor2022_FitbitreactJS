import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import { AuthenticationContext } from "./contexts/AuthenticationContext";

function App() {
  //Installed react-icons - use the url below to search for icons
  //https://react-icons.github.io/react-icons

  const url = window.location.href;
  const access_token = getAccessToken(url);
  const userId = getUserId(url);
  const BASE_URL = "https://api.fitbit.com/1/user/";

  //redirects to authorization page if access token is not found
  if (access_token == "") {
    window.location.href =
      "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=23899M&redirect_uri=http%3A%2F%2Ffitbit%2Dbach2022.herokuapp.com%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
  }

  return (
    //Values inside AuthenticationContext can be accessed by any child compoenent
    <>
      <AuthenticationContext.Provider
        value={{ userId, access_token, BASE_URL }}
      >
        <Header />
        <Grid />
      </AuthenticationContext.Provider>
    </>
  );
}

//extracts access token from the url
function getAccessToken(url) {
  if (url.match("#access_token="))
    return url.split("#")[1].split("=")[1].split("&")[0];
  return "";
}

//extracts user-ID from the url
function getUserId(url) {
  if (url.match("user_id="))
    return url.split("#")[1].split("=")[2].split("&")[0];
  return "";
}

export default App;
