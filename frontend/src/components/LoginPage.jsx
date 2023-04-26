import React, { useState, useRef } from "react";
import {
  Image,
  Button,
  Form,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import loginImg from "../assets/login.jpg";
import { useAuth } from "../hooks/index.jsx";
import { routes } from "../routes.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);

  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t("valid.required")),
      password: Yup.string().required(t("valid.required")),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem("userId", JSON.stringify(data));
        auth.logIn(data.username);
        const { from } = location.state || {
          from: { pathname: routes.mainPage() },
        };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.code === "ERR_BAD_REQUEST") {
          setAuthFailed(true);
          usernameRef.current.select();
          return;
        }
        if (err.isAxiosError && err.code === "ERR_NETWORK") {
          toast.error(t('toast.netError'));
          return;
        }
        throw err;
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">
                <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Image src={loginImg} roundedCircle="true" alt="Войти" />
                </Col>
                <Col className="col-12 col-md-6 mt-3 mt-mb-0">
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t("login.title")}</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder={t("login.usernameLabel")}
                        type="text"
                        value={formik.values.username}
                        ref={usernameRef}
                        disabled={formik.isSubmitting}
                        isInvalid={formik.errors.username || authFailed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      <Form.Label htmlFor="username">
                        {t("login.usernameLabel")}
                      </Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        id="password"
                        name="password"
                        autoComplete="password"
                        placeholder={t("login.passwordLabel")}
                        type="password"
                        value={formik.values.password}
                        disabled={formik.isSubmitting}
                        isInvalid={formik.errors.password || authFailed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      <Form.Label htmlFor="password">
                        {t("login.passwordLabel")}
                      </Form.Label>
                      <Form.Text className="invalid-tooltip">
                        {t("login.error")}
                      </Form.Text>
                    </Form.Floating>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={formik.isSubmitting}
                    >
                      {t("login.button")}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t("login.noAccount")}</span>{" "}
                <NavLink to={routes.signUpPage()}>{t("login.signUp")}</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
