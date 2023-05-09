import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import singUp from '../assets/singup.jpg';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const SingUpPage = () => {
  const [singUpFailed, setSingUpFailed] = useState(false);

  const { signUp } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const rollbar = useRollbar();

  const usernameRef = useRef();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('valid.min'))
        .max(20, t('valid.max'))
        .trim()
        .required(t('valid.required')),
      password: Yup.string()
        .min(6, t('valid.minPass'))
        .required(t('valid.required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('valid.confirmPass'))
        .required(t('valid.required')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ username, password }) => {
      setSingUpFailed(false);
      try {
        await signUp({ username, password });
        const { from } = location.state || {
          from: { pathname: routes.mainPage() },
        };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response.status === 409) {
          toast.error(t('toast.netError'));
          rollbar.error(t('toast.netError'), err);
          setSingUpFailed(true);
          usernameRef.current.select();
        }
        console.error(err);
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={singUp} roundedCircle="true" alt="Регистрация" />
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.title')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder={t('signup.usernameLabel')}
                    type="text"
                    value={formik.values.username}
                    ref={usernameRef}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.username || singUpFailed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="username">
                    {t('signup.usernameLabel')}
                  </Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.username || null}
                  </Form.Text>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    autoComplete="password"
                    placeholder={t('signup.passLabel')}
                    type="password"
                    value={formik.values.password}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.password || singUpFailed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="password">
                    {t('signup.passLabel')}
                  </Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.password || null}
                  </Form.Text>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    placeholder={t('signup.confirmPassLabel')}
                    type="password"
                    value={formik.values.confirmPassword}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.confirmPassword || singUpFailed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="confirmPassword">
                    {t('signup.confirmPassLabel')}
                  </Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.confirmPassword || t('signup.error')}
                  </Form.Text>
                </Form.Floating>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('signup.button')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingUpPage;
