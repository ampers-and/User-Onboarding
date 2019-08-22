import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const Form = () => {

    const [user, setUser] = useState([]);

    return (

        <div className='form'>
            <form onSubmit={event => handleSubmit(event)}>

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        onChange={event => handleChange(event)} />
                </label>

                <label>
                    Email:
                    <input
                        type='text'
                        name='email'
                        onChange={event => handleChange(event)} />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        onChange={event => handleChange(event)}/>
                </label>

                <label>
                    I accept the Terms of Service
                    <input 
                        type='checkbox'
                        name='termsOfService'
                        onChange={event => handleChange(event)} required/>
                </label>
                

                <button>Submit!</button>
            </form>
        </div>
    )
}