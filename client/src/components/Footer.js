import { matchPath, useLocation } from "react-router-dom";
import logo from "../img/logo.png";
import "../Styles/footer.css";
import { MAIN_ROUTE } from "../utils/consts";
const routeVisible = [MAIN_ROUTE];
const Footer = () => {
  const { pathname } = useLocation();
  const isMatch = routeVisible.some((path) => matchPath(path, pathname));
  return !isMatch ? null : (
    <footer className="footer" id="footer">
      <div className="_container footer-container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="footer-row-block">
          <ul className="footer-row">
            <li>Sign in</li>
            <li>Sign up</li>
            <li>Email</li>
            <li>Telegram</li>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
