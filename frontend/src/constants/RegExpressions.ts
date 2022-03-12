//Regular expression to validate is valid VISA card number
export const visaRegExpression = /^(?:4[0-9]{15}?)$/

//Regular expression to validate is valid VISA card number
export const masterRegExpression = /^(?:5[1-5][0-9]{14})$/

//Regular expression to validate is valid Expire date
export const expireDateRegExpression = /^(0[1-9]|1[0-2])\/?(20[0-9][0-9])$/;

//Regular expression to validate is valid CVV number
export const cvvRegExpression = /^[0-9]{3,4}$/
