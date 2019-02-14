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