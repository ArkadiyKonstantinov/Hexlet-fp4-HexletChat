import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';

import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import * as filter from 'leo-profanity';
import { toast } from 'react-toastify';

import { useAuth, useBackendApi } from '../../../hooks/index.jsx';
import { channelsSelectors } from '../../../slices/channelsSlice.js';

const MessageForm = () => {
  const auth = useAuth();
  const { newMessage } = useBackendApi();
  const { t } = useTranslation();
  const messageRef = useRef();
  const currentChannelId = useSelector(channelsSelectors.getCurrentId);

  useEffect(() => {
    messageRef.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .trim()
        .required(),
    }),
    onSubmit: async (values) => {
      const message = {
        text: filter.clean(values.body),
        channelId: currentChannelId,
        username: auth.username,
      };
      try {
        await newMessage(message);
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
            variant="group-vertical"
            className="text-primary border-0"
            disabled={formik.isSubmitting || formik.errors.body}
          >
            <BsArrowRightSquare size={25} />
            <span className="visually-hidden">{t('chat.sendButton')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
