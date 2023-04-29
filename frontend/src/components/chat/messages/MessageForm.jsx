import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useAuth, useBackendApi } from '../../../hooks/index.jsx';

const MessageForm = ({ currentChannelId }) => {
  const auth = useAuth();
  const { newMessage } = useBackendApi();
  const { t } = useTranslation();
  const messageRef = useRef();
  useEffect(() => {
    messageRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const message = {
        text: filter.clean(values.body),
        channelId: currentChannelId,
        username: auth.username,
      };
      try {
        newMessage(message);
        formik.setSubmitting(false);
        formik.resetForm();
      } catch (err) {
        toast.error(t('toast.messageError'));
        console.error(err);
      }
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
            aria-label={t('chat.messageLabel')}
            placeholder={t('chat.messagePlaceholder')}
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
            <span className="visually-hidden">{t('chat.sendButton')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
