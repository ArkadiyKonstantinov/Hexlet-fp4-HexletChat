import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import useAuth from "../hooks";
import { useTranslation } from "react-i18next";

const ChatNavbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">{t('header.title')}</Navbar.Brand>
        {auth.loggedIn || auth.username !== null ? (
          <Button onClick={() => auth.logOut()} className="btn-primary">
            {t('header.button')}            
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
