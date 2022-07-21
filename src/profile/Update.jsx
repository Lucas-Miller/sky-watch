// Component that allows user to update their profile, change password, or
// delete their account

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Update({ history }) {
    const user = accountService.userValue;
    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        locationNames: user.locationNames,
        email: user.email,
        password: '',
        confirmPassword: '',
        numberOfLocations: user.numberOfLocations,
        //locations: []
        //console.log(user.numberOfLocations),
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        locationNames: Yup.string(),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.update(user.id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        if (confirm('Are you sure?')) {
            setIsDeleting(true);
            accountService.delete(user.id)
                .then(() => alertService.success('Account deleted successfully'));
        }
    }

    
    function onChangeLocations(e, field, values, setValues) {
        // update dynamic form
        const locations = [...values.locations];
        const numberOflocations = e.target.value || 0;
        const previousNumber = parseInt(field.value || '0');
        if (previousNumber < numberOflocations) {
            for (let i = previousNumber; i < numberOflocations; i++) {
                locations.push({ name: '', email: '' });
            }
        } else {
            for (let i = previousNumber; i >= numberOflocations; i--) {
                locations.splice(i, 1);
            }
        }
        setValues({ ...values, locations });

        // call formik onChange method
        field.onChange(e);
    }
    // Add this to the formik field
    //onChange={e => onChangeLocations(e, field, values, setValues)}
    
    

    return (
        

        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues, isSubmitting }) => (
                <Form>
                    
                    <h1>Update Profile</h1>
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                    </div>


                    <div className="form-row">
                                <div className="form-group">
                                    <label>Number of Locations</label>
                                    <Field name="numberOfLocations">
                                    {({ field }) => (
                                        <select {...field} className={'form-control' + (errors.numberOfLocations && touched.numberOfLocations ? ' is-invalid' : '')} >
                                            <option value=""></option>
                                            {[1,2,3,4,5,6,7,8,9,10].map(i => 
                                                <option key={i} value={i}>{i}</option>
                                            )}
                                        </select>
                                    )}
                                    </Field>
                                    <ErrorMessage name="numberOfLocations" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                    


                        {/*                             
                        <FieldArray name="locations">
                        {() => (values.locations.map((location, i) => {
                            const locationErrors = errors.locations?.length && errors.locations[i] || {};
                            const locationTouched = touched.locations?.length && touched.locations[i] || {};
                            return (
                                <div key={i} className="list-group list-group-flush">
                                    <div className="list-group-item">
                                        <h5 className="card-title">Location {i + 1}</h5>
                                        <div className="form-row">
                                            <div className="form-group col-6">
                                                <label>Name</label>
                                                <Field name={`locations.${i}.name`} type="text" className={'form-control' + (locationErrors.name && locationTouched.name ? ' is-invalid' : '' )} />
                                                <ErrorMessage name={`locations.${i}.name`} component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-6">
                                                <label>Address</label>
                                                <Field name={`locations.${i}.address`} type="text" className={'form-control' + (locationErrors.address && locationTouched.address ? ' is-invalid' : '' )} />
                                                <ErrorMessage name={`locations.${i}.address`} component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }))}
                        </FieldArray>
                    */}
                    


                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Location Name</label>
                            <Field name="locationNames" type="text" className={'form-control' + (errors.locationNames && touched.locationNames ? ' is-invalid' : '')} />
                            <ErrorMessage name="locationNames" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <h3 className="pt-3">Change Password</h3>
                    <p>Leave blank to keep the same password</p>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Update
                        </button>
                        <button type="button" onClick={() => onDelete()} className="btn btn-danger" style={{ width: '75px' }} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                        <Link to="." className="btn btn-link">Cancel</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Update };