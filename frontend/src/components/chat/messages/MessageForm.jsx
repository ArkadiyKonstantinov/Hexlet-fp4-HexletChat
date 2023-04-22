import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { socket } from "../../../socket.js";
import { Form, Button } from "react-bootstrap";
import { BsArrowRightSquare } from "react-icons/bs";

const MessageForm = ({ currentChannelId }) => {
  const messageRef = useRef();
  useEffect(() => {
    messageRef.current.focus();
  })

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: (values) => {
      const message = {
        text: values.body,
        channelId: currentChannelId,
        username: "",
      };
      socket.emit("newMessage", message);
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="input-group has-validation">
          <Form.Control
            id="body"
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            ref={messageRef}
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button
            type="sybmit"
            disabled={formik.isSubmitting}
            variant="group-vertical"
          >
            <BsArrowRightSquare />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
