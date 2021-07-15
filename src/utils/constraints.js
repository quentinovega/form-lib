export const required = (message = "Ce champ est requis") => ({ message })

//string
export const url = (message = "not an url") => ({ message })
export const email = (message = "not an email") => ({ message })
export const uuid = (message = "not an uuid") => ({ message })
export const matches = (regexp = /.*/, message = "not an email") => ({ regexp, message })

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

//mixed
export const test = (ref, message = 'test faile', test) => ({ref, message, test})


//todo: custom ??? (exemple : IP)