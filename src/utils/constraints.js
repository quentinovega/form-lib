export const required = (message = "Ce champ est requis") => ({ message })
export const min = (min, message = "trop petit") => ({ min, message })
export const max = (max, message = "trop grand") => ({ max, message })
export const positive = (message = "trop negatif") => ({ message })
export const negative = (message = "trop positif") => ({ message })
export const integer = (message = "an integer please") => ({ message })
