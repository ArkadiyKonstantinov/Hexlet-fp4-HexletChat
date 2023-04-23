import React, { useEffect, useRef } from "react";
import { socket } from "../../../socket";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { channelsSelectors } from "../../../slices/channelsSlice";
import { toast } from "react-toastify";

const AddChannel = ({ onHide }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: "",
    },
    onSubmit: (values) => {
      try {
        const { channelName } = values;
        socket.emit("newChannel", { name: channelName });
        formik.setSubmitting(false);
        onHide();
        toast.success("Канал создан");
      } catch (err) {
        toast.error("Не удалось добавить");
        console.error(err);
      }
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .trim()
        .required("Обязательное поле")
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов")
        .notOneOf(channelsNames, "Должно быть уникальным"),
    }),
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Floating className="mb-2">
            <Form.Control
              className="mb-2"
              id="channelName"
              name="channelName"
              ref={inputRef}
              required={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
            />
            <Form.Label>Имя канала</Form.Label>
            <Form.Text className="invalid-feedback">
              {formik.errors.channelName}
            </Form.Text>
          </Form.Floating>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={onHide}>
              Отменить
            </Button>
            <Button variant="primary" type="submit">
              Добавить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
