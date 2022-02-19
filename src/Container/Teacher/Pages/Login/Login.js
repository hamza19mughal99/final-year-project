import React, { useState } from 'react';
import "./Login.css";
import {Spinner} from 'react-bootstrap';
import firebase from '../../../../config/firebase';

const Login = () => {

	const [loader, setLoader] = useState(false)
	const [user, setUser] = useState({
		email: "",
		password: ""
	})
	const [errorData, setErrorData] = useState({
		email: "",
		password: ""
	});
	const [error, setError] = useState('')
	const [backError, setBackError] = useState('')


	const handleInputs = (e) => {
		const {name, value} = e.target

		setError('');
		setErrorData({
			...errorData,
			[name]: ''
		})

		setBackError('')

		setUser({
			...user,
			[name]: value
		})

	}

	const validate = () => {

		let errors = {
			email: '',
			password: ''
		};
		let formIsValid = true;

		if (!user["email"]) {
			formIsValid = false;
			errors["email"] = "Cannot be empty";
		}

		else if (typeof user["email"] !== "undefined") {
			let lastAtPos = user["email"].lastIndexOf("@");
			let lastDotPos = user["email"].lastIndexOf(".");

			if (
				!(
					lastAtPos < lastDotPos &&
					lastAtPos > 0 &&
					user["email"].indexOf("@@") === -1 &&
					lastDotPos > 2 &&
					user["email"].length - lastDotPos > 2
				)
			) {
				formIsValid = false;
				errors["email"] = "Email is not valid";
			}
		}

		if (!user["password"]) {
			formIsValid = false;
			errors["password"] = "Cannot be empty";
		}

		else if(user['password'].length < 6) {
			formIsValid = false;
			errors["password"] = "Password must be at least 6 characters";
		}

		setErrorData({...errors});
		return formIsValid

	}

	const checkTeacher = async (event) => {
		event.preventDefault()
		setLoader(true)

		setError('');

		if (validate()) {
			firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
				setLoader(false)
				firebase.auth().onAuthStateChanged((user) => {
					if (user) {
						const uid = user.uid;
						localStorage.setItem("teacherId", uid)
						window.location.href = "/teacher/dashboard"
					} else {
						// User is signed out
						// ...
					}
				});
			}).catch((error) => {
				setLoader(false)
				setBackError(error.message)
			})
		}
		else {
			setLoader(false)
		}
	}

	let button;
	if (loader) {
		button = <Spinner animation="border" style={{color: "#3895D3"}} />
	}
	else {
		button = (
			<div>
				<button type="submit" className="login_btn" >Login</button>
			</div>
		)
	}

	const errorElement = (msg) => {
		return <p style={{color: 'red'}} className={'m-0 ml-2 p-0 error'}>{msg}</p>
	}

	return (
		<>
			<section className='login_section'>
				<div className="container">
					<div className="row justify-content-center align-items-center 100vh">
						<div className="col-8">
							<div className="card rounded">
								<div className="card-body text-center">
									<h2 style={{fontWeight: "bold", fontSize: "23px"}}> TEACHER LOGIN </h2>
									<h5 className={'error text-center'}>{error}</h5>
									<p style={{color: "red"}} className={'error text-center mt-3'}>{backError}</p>
									<form className="mt-5" onSubmit={checkTeacher}>
										<div className=" form-row">
											<div className="col-md-12">
												<label>Email</label>
												<input type="text"
													name="email"
													value={user.email}
													onChange={handleInputs}
													className="form-control"
													placeholder="mehveshLodhi@ssuet.edu.pk" />
											</div>
											{errorElement(errorData.email)}

											<div className="col-md-12">
												<label>Password</label>
												<input type="password"
													name="password"
													value={user.password}
													onChange={handleInputs}
													className="form-control"
													placeholder="min 6 characters" />
											</div>
											{errorElement(errorData.password)}

											<div className="col-md-12 mt-4">
												{button}
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
export default Login;

// var SignupPage = () => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
//
// 	const handleSubmit = async (event) => {
// 		event.preventDefault()
// 		console.log(email, password);
// 		// Firebase
// 		await firebase.auth().createUserWithEmailAndPassword(email, password)
// 			.then(() => {
// 				var newEmail = email.replace(".", "*")
// 				newEmail = newEmail.replace(".", "*")
// 				alert("User Created succesfully")
//
// 				firebase.database().ref('/StudentData').child(newEmail).set(
//
// 					{
// 						Email: email
// 					}
// 				)
//
// 			})
// 			.catch(() => {
// 				alert("Error Occured or user not created")
// 			})
// 	}
// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit}>
// 				<div className="mb-3">
// 					<label htmlFor="exampleInputEmail1" className="form-label">
// 						Email address
// 					</label>
// 					<input
// 						type="email"
// 						className="form-control"
// 						id="exampleInputEmail1"
// 						aria-describedby="emailHelp"
// 						onChange={(ev) => setEmail(ev.target.value)}
// 					/>
// 					<div id="emailHelp" className="form-text">
// 						We'll never share your email with anyone else.
// 					</div>
// 				</div>
// 				<div className="mb-3">
// 					<label htmlFor="exampleInputPassword1" className="form-label">
// 						Password
// 					</label>
// 					<input
// 						type="password"
// 						className="form-control"
// 						id="exampleInputPassword1"
// 						onChange={(ev) => setPassword(ev.target.value)}
// 					/>
// 				</div>
// 				<button type="submit" className="btn btn-primary">
// 					Signup
// 				</button>
// 			</form>
// 		</div>
// 	);
// }