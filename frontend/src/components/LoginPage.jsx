import React from 'react';
// import { Formik } from 'formik';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
   const formik = useFormik({
     initialValues: {
       login: '',
       password: '',
     },

     validationSchema: Yup.object({
       login: Yup.string()
         .max(20, 'Must be 20 characters or less')
         .required('Required'),
       password: Yup.string()
         .min(6, 'Must be 6 characters of more')
         .max(20, 'Must be 20 characters or less')
         .required('Required'),
     }),
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });

   return (
     <form onSubmit={formik.handleSubmit}>
      <h1>Войти</h1>
       <input
         id="login"
         name="login"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.login}
         placeholder='Ваш ник'
       />
       {formik.touched.login && formik.errors.login ? (
         <div>{formik.errors.login}</div>
       ) : null}
       <input
         id="password"
         name="password"
         type="password"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.password}
         placeholder='Ваш пароль'
       />
       {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}

       <button type="submit">Войти</button>

     </form>
   );
}

export default LoginPage;
