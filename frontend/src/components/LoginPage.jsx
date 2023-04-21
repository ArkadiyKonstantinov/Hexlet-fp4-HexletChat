import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatNavbar from "./ChatNavbar.jsx";
import login from "../login.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import useAuth from "../hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { routes } from "../routes.js";

const LoginPage = () => {
  const notify = () =>
    toast.error("Ошибка сети", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

  const [authFailed, setAuthFailed] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "admin",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string()
        .min(3, "Must be 6 characters of more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const res = await axios.post(routes.loginPath(), {
          username,
          password,
        });
        localStorage.setItem("userId", JSON.stringify(res.data));
        setAuthFailed(false);
        auth.logIn();
        navigate("/");
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.code === "ERR_BAD_REQUEST") {
          // console.dir(err)
          setAuthFailed(true);
          return;
        }
        if (err.isAxiosError && err.code === "ERR_NETWORK") {
          notify();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <ChatNavbar />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body>
                <Row className="p-5">
                  <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <Image src={login} roundedCircle="true" alt="Войти" />
                  </Col>
                  <Col className="col-12 col-md-6 mt-3 mt-mb-0">
                    <Form onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">Войти</h1>
                      <Form.Floating className="mb-3">
                        <Form.Control
                          isInvalid={authFailed}
                          id="username"
                          name="username"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          placeholder="Ваш ник"
                        />
                        <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      </Form.Floating>
                      <Form.Floating className="mb-4">
                        <Form.Control
                          isInvalid={authFailed}
                          id="password"
                          name="password"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          placeholder="Ваш пароль"
                        />
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Form.Text className="invalid-feedback">
                          Неверное имя пользователя или пароль
                        </Form.Text>
                      </Form.Floating>
                      <Button
                        className="w-100 mb-3 btn btn-outliner-primary"
                        type="submit"
                      >
                        Войти
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
