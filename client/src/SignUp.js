import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import history from './history';

function SignupForm() {
	return(
		<div>
			<Formik
				initialValues = {{ userID: "", password: "" }}
				onSubmit = {(values, { setSubmitting }) => {
					setTimeout(() => {
						console.log('Submitted these - ', values);
						// setSubmitting(false);
					}, 500);
					axios
						.post('register', values)
						.then(() => console.log('Values sent'))
						.catch(err => {
							console.error(err);
						});
					history.push('/login')
				}}
				validationSchema = {Yup.object().shape({
					userID: Yup.string()
						.required('Please provide a userID'),
					password: Yup.string()
						.required('Please provide a password')
						.min(8, 'Password too short - must atleast have 8 characters')
						.matches(/(?=.*[0-9])/, 'Password must contain a number.')
				})}
			>
			{(
				{
					values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur,
					handleSubmit,
					isValid,
				}
			) => (
				<div>
					<br/>
					<br/>
					<div className="titlemain"> Register </div>
					<br />
					<br />
					<br />
					<div className="desc2"> Create a new account</div>
					<br />

	        <Form noValidate onSubmit={handleSubmit}>

						<Form.Row className="justify-content-md-center">
							<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomUserID">
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
										name="userID"
										type="text"
										placeholder="Enter a unique userID"
										value={values.userID}
										onChange={handleChange}
										onBlur={handleBlur}
										isInvalid={!!errors.userID && touched.userID}
										isValid={!errors.userID && touched.userID}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.userID}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Form.Row>

					<Form.Row className="justify-content-md-center">
						<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomPassword">
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
									name="password"
									type="password"
									placeholder="Enter a strong password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={errors.password && touched.password}
									isValid={!errors.password && touched.password}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.password}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
				</Form.Row>

				<Form.Row className="justify-content-md-center">
					<Button type="submit" disabled = {(errors.userID || errors.password) || !(touched.userID || touched.password)}>Sign Up</Button>
				</Form.Row>
        <br />
        <Form.Row className="justify-content-md-center">
          <pre className="hlink"> <a onClick={() => history.push('/login')}> Already signed-up? Click here to login. </a></pre>
        </Form.Row>

      </Form>
			</div>
			)}
			</Formik>
		</div>
	)
}
//<Button type="submit" disabled={!(props.isValid && props.dirty)} onClick={() => history.push('/login')}>Sign Up</Button>
export default SignupForm;
