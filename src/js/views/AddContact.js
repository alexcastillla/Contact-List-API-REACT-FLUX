import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

const AddContact = props => {
	const { store, actions } = useContext(Context);

	let testContact =
		typeof props.location.state !== "undefined" && typeof props.location.state.contact !== "undefined"
			? props.location.state.contact
			: null;

	const [id, setId] = useState(testContact !== null ? testContact.id : "");
	const [fullName, setFullName] = useState(testContact !== null ? testContact.full_name : "");
	const [address, setAddress] = useState(testContact !== null ? testContact.address : "");
	const [email, setEmail] = useState(testContact !== null ? testContact.email : "");
	const [phone, setPhone] = useState(testContact !== null ? testContact.phone : "");
	const [contact, setContact] = useState(testContact !== null ? props.location.state.contact : null);
	const [message, setMessage] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		if (testContact !== null) {
			actions.updateContact(id, fullName, address, email, phone);
		} else {
			actions.addingContact(fullName, address, email, phone);
		}
		setFullName("");
		setAddress("");
		setEmail("");
		setPhone("");
		setMessage(true);
	};

	return (
		<div className="container">
			<form onSubmit={event => handleSubmit(event)}>
				<h1 className="text-center mt-5">{contact !== null ? "Edit" : "Add a new"} contact</h1>
				{message ? (
					<div className="alert alert-success" role="alert">
						Successfull
					</div>
				) : null}
				<div className="form-group">
					<label>Full Name</label>
					<input
						onChange={event => setFullName(event.target.value)}
						value={fullName}
						type="text"
						className="form-control"
						placeholder="Full Name"
					/>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						onChange={event => setEmail(event.target.value)}
						value={email}
						type="email"
						className="form-control"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-group">
					<label>Phone</label>
					<input
						onChange={event => setPhone(event.target.value)}
						value={phone}
						type="phone"
						className="form-control"
						placeholder="Enter phone"
					/>
				</div>
				<div className="form-group">
					<label>Address</label>
					<input
						onChange={event => setAddress(event.target.value)}
						value={address}
						type="text"
						className="form-control"
						placeholder="Enter address"
					/>
				</div>
				<button type="submit" className="btn btn-primary form-control">
					save
				</button>
				<Link className="mt-3 w-100 text-center" to="/">
					or get back to contacts
				</Link>
			</form>
		</div>
	);
};

AddContact.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
		state: PropTypes.object.isRequired
	}).isRequired
};

export default withRouter(AddContact);
