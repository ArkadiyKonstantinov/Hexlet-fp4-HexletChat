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
import loginImg from "../assets/login.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import useAuth from "../hooks";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { routes } from "../routes.js";

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "admin",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem("userId", JSON.stringify(data));
        auth.logIn(data.username);
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.code === "ERR_BAD_REQUEST") {
          setAuthFailed(true);
          usernameRef.current.select();
          return;
        }
        if (err.isAxiosError && err.code === "ERR_NETWORK") {
          toast.error("Ошибка сети");
          return;
        }
        throw err;
      }
    },
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
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder="Ваш ник"
                        type="text"
                        value={formik.values.username}
                        ref={usernameRef}
                        disabled={formik.isSubmitting}
                        isInvalid={authFailed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        id="password"
                        name="password"
                        autoComplete="password"
                        placeholder="Ваш пароль"
                        type="password"
                        value={formik.values.password}
                        disabled={formik.isSubmitting}
                        isInvalid={authFailed}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Text className="invalid-tooltip">
                        Неверное имя пользователя или пароль
                      </Form.Text>
                    </Form.Floating>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={formik.isSubmitting}
                    >
                      Войти
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>{" "}
                <NavLink to="/singup">Регистрация</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
