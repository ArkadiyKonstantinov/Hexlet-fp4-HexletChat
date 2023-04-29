import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../../../slices/channelsSlice';
import { useBackendApi } from '../../../hooks/index.jsx';

const RenameChannel = ({ modal, onHide }) => {
  const { renameChannel } = useBackendApi();
  const { channelName: currentChannelName, id } = modal;
  const { t } = useTranslation();

  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels
    .map((channel) => channel.name)
    .filter((name) => name !== currentChannelName);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: currentChannelName,
    },
    onSubmit: (values) => {
      const { channelName } = values;
      const name = filter.clean(channelName);
      try {
        renameChannel({ name, id });
        formik.setSubmitting(false);
        onHide();
        toast.success(t('toast.channelRenamed'));
      } catch (err) {
        toast.error(t('toast.channelRenameError'));
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
        <Modal.Title>{t('modal.renameTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Floating className="mb-2">
            <Form.Control
              className="mb-2"
              id="channelName"
              name="channelName"
              ref={inputRef}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
              isInvalid={formik.errors.channelName}
            />
            <Form.Label htmlFor="channelName">
              {t('modal.renameLabel')}
            </Form.Label>
            <Form.Text className="invalid-feedback">
              {formik.errors.channelName}
            </Form.Text>
          </Form.Floating>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={onHide}>
              {t('modal.cancelButton')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modal.renameButton')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
