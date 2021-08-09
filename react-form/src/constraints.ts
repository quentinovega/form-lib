import { 
  MatcheConstraint, 
  NumberConstraint, 
  OneOfConstraint, 
  ReferenceConstraint, 
  SimpleConstraint, 
  TestConstraint, 
  WhenConstraint 
} from "./resolvers/types"


export const required = (message: string = "Ce champ est requis"): SimpleConstraint => ({ message })

//string
export const url = (message: string = "not an url"): SimpleConstraint => ({ message })
export const email = (message: string = "not an email"): SimpleConstraint => ({ message })
export const uuid = (message: string = "not an uuid"): SimpleConstraint => ({ message })
export const matches = (regexp: RegExp = /.*/, message: string = "not an email"): MatcheConstraint => ({ regexp, message })

//number
export const min = (value: number, message: string = "trop petit"): NumberConstraint => ({ value, message })
export const max = (value: number, message: string = "trop grand"): NumberConstraint => ({ value, message })
export const positive = (message: string = "trop negatif"): SimpleConstraint => ({ message })
export const negative = (message: string = "trop positif"): SimpleConstraint => ({ message })
export const integer = (message: string = "an integer please"): SimpleConstraint => ({ message })
export const lessThan = (ref: string | number, message: string = `plus grand que ${ref}`): ReferenceConstraint => ({ ref, message })
export const moreThan = (ref: string | number, message: string = `plus petit que ${ref}`): ReferenceConstraint => ({ ref, message })

//array
export const length = (value: number, message: string = `la taille doit etre ${value}`): NumberConstraint => ({ value, message })

//mixed
export const test = (ref: string, message: string = 'test failed', test: (val: any) => boolean): TestConstraint=> ({ ref, message, test })
export const when = (ref: string, test: (val: any) => boolean, then: object, otherwise: object): WhenConstraint => ({ ref, test, then, otherwise })
export const oneOf = (arrayOfValues: any[], message: string): OneOfConstraint => ({ arrayOfValues, message })