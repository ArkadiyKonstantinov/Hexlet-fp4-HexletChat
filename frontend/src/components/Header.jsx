import { Navbar, Button, Container } from "react-bootstrap";
import { useAuth } from "../hooks/index.jsx";
import { useTranslation } from "react-i18next";
import { routes } from "../routes.js";

const ChatNavbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href={routes.mainPage()}>
          {t("header.title")}
        </Navbar.Brand>
        {auth.loggedIn || auth.username !== null ? (
          <Button onClick={() => auth.logOut()} className="btn-primary">
            {t("header.button")}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
