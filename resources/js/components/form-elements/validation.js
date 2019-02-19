import validator from 'validator'

export function validate(data) {
	let results = []

	data.forEach(function(array) {
		let rules = array.rules.split('|')
		rules.forEach(function(rule) {
			if(rule === 'required' && validator.isEmpty(array.value)) {
				results[ array.field_name ] = array.name + ' is required.'
			}

			if(rule === 'email' && ! validator.isEmail(array.value) && ! validator.isEmpty(array.value)) {
				results[ array.field_name ] = 'Email address is invalid.'
			}

			// CUSTOM VALIDATIONS
			if(rule === 'scorecard_start_time' && (array.value.hour || array.value.minutes || array.value.meridian)) {
				let hour = (typeof array.value.hour !== 'undefined') ? array.value.hour : null
				let minutes = (typeof array.value.minutes !== 'undefined') ? array.value.minutes : null
				let meridian = (typeof array.value.meridian !== 'undefined') ? array.value.meridian : null

				if(! hour || ! minutes || ! meridian) {
					results[ array.custom_field_name ] = 'All fields must be filled out.'
				} else if(hour < 1 || hour > 12) {
					results[ array.custom_field_name ] = 'Hour must be between 1-12.'
				} else if(minutes && minutes.length !== 2) {
					results[ array.custom_field_name ] = 'Minutes must be 2 digits.'
				} else if(isNaN(hour)) {
					results[ array.custom_field_name ] = 'Hour must be a number.'
				} else if(isNaN(minutes)) {
					results[ array.custom_field_name ] = 'Minutes must be a number.'
				}
			}
		})
	})

	return results
}

// TO-DO: replace these validation methods with the new hotness.
export function validateEmail(email) {
	if(validator.isEmpty(email)) {
		return {
			inValid: true,
			message: 'You must enter an email address.'
		}
	} 
	
	if(! validator.isEmail(email)) {
		return {
			inValid: true,
			message: 'The email address is invalid.'
		}
	}

	return { inValid: false }
}

export function validateEntriesMatch(type, string1, string2) {
	if(string1 !== string2) {
		return {
			inValid: true,
			message: 'The ' + type + ' entries do not match.'
		}
	}

	return { inValid: false }
}

export function validateMinStringLength(string, min_length) {
	if(string.length < min_length) {
		return {
			inValid: true,
			message: 'The string must be at least ' + min_length + ' characters long.'
		}
	}

	return { inValid: false }
}

export function validateIsNumber(form_field, value) {
	let valid = (isNaN(value)) ? false : true
	return { 
		inValid: valid,
		message: form_field + ' must be a number.'
	}
}