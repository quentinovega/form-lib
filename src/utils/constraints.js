export const required = (message = "Ce champ est requis") => ({ message })

//string
export const url = (message = "not an url") => ({ message })
//todo: matches
//todo: email
//todo: uuid

//number
export const min = (value, message = "trop petit") => ({ value, message })
export const max = (value, message = "trop grand") => ({ value, message })
export const positive = (message = "trop negatif") => ({ message })
export const negative = (message = "trop positif") => ({ message })
export const integer = (message = "an integer please") => ({ message })
export const lessThan = (ref, message = `plus grand que ${ref}`) => ({ ref, message })
export const moreThan = (ref, message = `plus petit que ${ref}`) => ({ ref, message })

//array
export const length = (value, message = `la taille doit etre ${value}`) => ({ value, message })
//todo: implement array().of() ???

//mixed
export const test = (name, message = 'test faile', test) => ({name, message, test})


//todo: custom ??? (exemple : IP)