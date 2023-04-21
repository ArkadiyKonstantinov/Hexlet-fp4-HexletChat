import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import useAuth from "../hooks";

const ChatNavbar = () => {
  const auth = useAuth();
  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn ? (
          <Button onClick={() => auth.logOut()} className="btn-primary">
            Выйти
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
