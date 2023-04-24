import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks";
import { useFormik } from "formik";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import * as Yup from "yup";
import singUp from "../assets/singup.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SingUpPage = () => {
  const [singUpFailed, setSingUpFailed] = useState(false);

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const usernameRef = useRef();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов")
        .trim()
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Не менее 6 символов")
        .required("Обязательное поле"),
      confirmPassword: Yup.string()
        .min(6, "Не менее 6 символов")
        .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
        .required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      setSingUpFailed(false);
      try {
        const { username, password } = values;
        const { data } = await axios.post("/api/v1/signup", {
          username,
          password,
        });
        localStorage.setItem("userId", JSON.stringify(data));
        auth.logIn(username);
        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response.status === 409) {
          setSingUpFailed(true);
          usernameRef.current.select();
        }
        console.error(err);
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
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={singUp} roundedCircle="true" alt="Регистрация" />
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder="Имя пользователя"
                    type="text"
                    value={formik.values.username}
                    ref={usernameRef}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.username || singUpFailed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.username || null}
                  </Form.Text>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Пароль"
                    type="password"
                    value={formik.values.password}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.password || singUpFailed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="username">Пароль</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.password || null}
                  </Form.Text>
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    placeholder="Подвтвердите пароль"
                    type="password"
                    value={formik.values.confirmPassword}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.confirmPassword || singUpFailed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="username">Подтвердите пароль</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.confirmPassword ||
                      "Такой пользователь уже существует"}
                  </Form.Text>
                </Form.Floating>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  Зарегестрироваться
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
