import validator from 'validator'

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
	console.log(string.length, min_length)
	if(string.length < min_length) {
		return {
			inValid: true,
			message: 'The string must be at least ' + min_length + ' characters long.'
		}
	}

	return { inValid: false }
}