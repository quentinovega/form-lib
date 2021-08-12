import { 
  MatcheConstraint, 
  NumberConstraint, 
  OneOfConstraint,
  NumberReferenceConstraint, 
  SimpleConstraint, 
  TestConstraint, 
  WhenConstraint
} from "./resolvers/types"

import * as yup from 'yup';
import Reference from "yup/lib/Reference";

export const required = (message: string = "Ce champ est requis"): SimpleConstraint => ({ message })

//string
export const url = (message: string = "not an url"): SimpleConstraint => ({ message })
export const email = (message: string = "not an email"): SimpleConstraint => ({ message })
export const uuid = (message: string = "not an uuid"): SimpleConstraint => ({ message })
export const matches = (regexp: RegExp = /.*/, message: string = "not an email"): MatcheConstraint => ({ regexp, message })

//string & number
export const min = (ref: number | Reference<number>, message: string = "trop petit"): NumberReferenceConstraint => ({ ref, message })
export const max = (ref: number | Reference<number>, message: string = "trop grand"): NumberReferenceConstraint => ({ ref, message })

//number
export const positive = (message: string = "trop negatif"): SimpleConstraint => ({ message })
export const negative = (message: string = "trop positif"): SimpleConstraint => ({ message })
export const integer = (message: string = "an integer please"): SimpleConstraint => ({ message })
export const lessThan = (ref: number | Reference<number>, message: string = `plus grand que ${ref}`): NumberReferenceConstraint => ({ ref, message })
export const moreThan = (ref: number | Reference<number>, message: string = `plus petit que ${ref}`): NumberReferenceConstraint => ({ ref, message })

//array
export const length = (value: number, message: string = `la taille doit etre ${value}`): NumberConstraint => ({ value, message })

//file
export const supportedFormat = (arrayOfValues: String[], message: 'Unsupported File Format'): OneOfConstraint => ({ arrayOfValues, message })
export const unsupportedFormat = (arrayOfValues: String[], message: 'Unsupported File Format'): OneOfConstraint => ({ arrayOfValues, message })
export const maxSize = (value: number, message: string = `size is excedeed ${value}`): NumberConstraint => ({value, message})

//mixed
export const test = (name: string, message: string = 'test failed', test: (val: any) => boolean): TestConstraint=> ({ name, message, test })
export const when = (ref: string, test: (val: any) => boolean, then: object, otherwise: object): WhenConstraint => ({ ref, test, then, otherwise })
export const oneOf = (arrayOfValues: any[], message: string): OneOfConstraint => ({ arrayOfValues, message })

export const ref = (ref: string): Reference => yup.ref(ref)