import React, { useEffect, useRef } from "react";
import { socket } from "../../../socket";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { channelsSelectors } from "../../../slices/channelsSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddChannel = ({ onHide }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const { t } = useTranslation();
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
        toast.success(t('toast.channelAdded'));
      } catch (err) {
        toast.error(t('toast.channelAddError'));
        console.error(err);
      }
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .trim()
        .required(t('valid.required'))
        .min(3, t('valid.min'))
        .max(20, t('valid.max'))
        .notOneOf(channelsNames, t('valid.mustBeUniq')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.addTitle')}</Modal.Title>
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
              isInvalid={
                formik.errors.channelName && formik.touched.channelName
              }
            />
            <Form.Label>{t('modal.addLabel')}</Form.Label>
            <Form.Text className="invalid-feedback">
              {formik.errors.channelName}
            </Form.Text>
          </Form.Floating>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={onHide}>
              {t('modal.cancelButton')}              
            </Button>
            <Button variant="primary" type="submit">
             {t('modal.addButton')} 
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
