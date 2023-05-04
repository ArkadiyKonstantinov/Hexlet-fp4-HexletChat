import React, { useState } from 'react';
import {
  Navbar,
  Button,
  Container,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';

import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const LogOutButton = () => {
  const { t } = useTranslation();
  const { loggedIn, logOut, username } = useAuth();

  if (loggedIn || username !== null) {
    return (
      <>
        <Navbar.Text className="ms-auto p-2">
          <BsPersonCircle />
          {'  '}
          {username}
        </Navbar.Text>
        <Button variant="outline-primary" onClick={logOut}>
          {t('header.button')}
        </Button>
      </>
    );
  }

  return null;
};

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(i18n.language);

  const handleToogle = ({ target: { value } }) => {
    if (value !== currentLng) {
      setCurrentLng(value);
      i18n.changeLanguage(value);
    }
  };

  return (
    <ButtonGroup onChange={handleToogle}>
      {i18n.languages
        .sort()
        .map((lng) => (
          <ToggleButton
            key={lng}
            id={lng}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={lng}
            checked={currentLng === lng}
          >
            {t(`header.${lng}`)}
          </ToggleButton>
        ))}
    </ButtonGroup>
  );
};

const ChatNavbar = () => {
  const { t } = useTranslation();

  return (
    <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href={routes.mainPage()}>
          {t('header.title')}
        </Navbar.Brand>
        <LanguageSelector />
        <Navbar.Toggle />
        <Navbar.Collapse>
          <LogOutButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
