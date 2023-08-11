import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	});

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameRef.current.value;
		const enteredStreet = streetRef.current.value;
		const enteredPostal = postalRef.current.value;
		const enteredCity = cityRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalIsValid = isFiveChars(enteredPostal);
		const enteredCityIsValid = !isEmpty(enteredCity);

		setFormInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postal: enteredPostalIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalIsValid &&
			enteredCityIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postal: enteredPostal,
			city: enteredCity,
		});
	};

	const isEmpty = (value) => value.trim() === '';
	const isFiveChars = (value) => value.trim().length === 5;

	const nameRef = useRef();
	const streetRef = useRef();
	const postalRef = useRef();
	const cityRef = useRef();

	const nameControlClasses = `${classes.control} ${
		formInputValidity.name ? '' : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formInputValidity.street ? '' : classes.invalid
	}`;
	const postalControlClasses = `${classes.control} ${
		formInputValidity.postal ? '' : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputValidity.city ? '' : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameRef} />
				{!formInputValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetRef} />
				{!formInputValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalRef} />
				{!formInputValidity.postal && (
					<p>Please enter a valid postal code, five characters long!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityRef} />
				{!formInputValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
