import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status}) => {

    const [user, setUser] = useState([]);

    useEffect( () => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status]);

    return (
        <div className='user-form'>
            <h1>Sign Up</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name" />

                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field type="text" name="email" placeholder="Email" />

                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field type="password" name="password" placeholder="Password" />

                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <Field component="select" className="role-select" name="role">
                    <option>Please Choose a Role</option>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Slytherin">Slytherin</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                </Field>
                <label className="checkbox-container">
                    I accept the Terms of Service
                    <Field
                        type="checkbox"
                        name="termsOfService"
                        checked={values.termsOfService}
                        required/>
                    <span className="checkmark" />
                </label>

                <button>Submit!</button>
            </Form>

            {user.map(u => (
                <ul className={u.role} key={u.id}>
                <li>Name: {u.name} </li>
                <li>Email: {u.email} </li>
                <li>Role: {u.role} </li>
                </ul>
            ))}

        </div>
    )
}

  const FormikUserForm = withFormik({

    mapPropsToValues({ name, email, password, role, termsOfService }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        role: role || "",
        termsOfService: termsOfService || false
      };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please Enter A Name"),
        email: Yup.string()
            .required("Please Enter A Valid Email Address"),
            // .matches(!'waffle@syrup.com'),
        password: Yup.string().min(6).required("Password Must be at least 6 Characters")

      }),
  
    handleSubmit(values, { setStatus }) {

    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }

  })(UserForm);
  
  export default FormikUserForm;