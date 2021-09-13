import * as constraints from '../src/constraints';
import * as Types from '../src/types';
import { testBasicConstraints } from './testUtils';

describe('Number resolver', () => {
  it('should resolve number constraints', () => {

    const errorMessage = "test must be a `number` type, but the final value was: `NaN` (cast from the value `\"fifou\"`).";
    const testConstraints = []

    const right = { test: 1 }
    const wrong = { test: 'fifou' }

    return testBasicConstraints(testConstraints, errorMessage, right, wrong, 'number')
  })
  it('should resolve integer constraints', () => {

    const errorMessage = "not integer";
    const testConstraints = [
      constraints.integer(errorMessage)
    ]

    const right = { test: 42 }
    const wrong = { test: 1.2 }

    return testBasicConstraints(testConstraints, errorMessage, right, wrong, 'number')
  })
  // it('should resolve positive constraints', () => {

  //   const errorMessage = "not positive";
  //   const testConstraints = {
  //     required: constraints.positive(errorMessage)
  //   }

  //   const right = { test: 42 }
  //   const wrong = { test: -42 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
  // it('should resolve negative constraints', () => {

  //   const errorMessage = "not negative";
  //   const testConstraints = {
  //     required: constraints.negative(errorMessage)
  //   }

  //   const right = { test: -42 }
  //   const wrong = { test: 42 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
  // it('should resolve min constraints', () => {

  //   const errorMessage = "there is a min condition";
  //   const testConstraints = {
  //     required: constraints.min(40, errorMessage)
  //   }

  //   const right = { test: 42 }
  //   const wrong = { test: 2 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
  // it('should resolve max constraints', () => {

  //   const errorMessage = "there is a max condition";
  //   const testConstraints = {
  //     required: constraints.max(44, errorMessage)
  //   }

  //   const right = { test: 42 }
  //   const wrong = { test: 45 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
  // it('should resolve moreThan constraints with ref', () => {

  //   const errorMessage = "not more than value";
  //   const testConstraints = {
  //     required: constraints.moreThan(constraints.ref('value'), errorMessage)
  //   }

  //   const right = { test: 42, value: 40 }
  //   const wrong = { test: 38, value: 40 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
  // it('should resolve moreThan constraints', () => {

  //   const errorMessage = "not more than value";
  //   const testConstraints = {
  //     required: constraints.moreThan(40, errorMessage)
  //   }

  //   const right = { test: 42 }
  //   const wrong = { test: 38 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
  // it('should resolve lessThan constraints with ref', () => {

  //   const errorMessage = "not less than value";
  //   const testConstraints = {
  //     required: constraints.lessThan(constraints.ref('value'), errorMessage)
  //   }

  //   const right = { test: 42, value: 44 }
  //   const wrong = { test: 46, value: 44 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
  // it('should resolve lessThan constraints', () => {

  //   const errorMessage = "not less than value";
  //   const testConstraints = {
  //     required: constraints.lessThan(44, errorMessage)
  //   }

  //   const right = { test: 42 }
  //   const wrong = { test: 46 }

  //   return testBasicConstraints(testConstraints, errorMessage, right, wrong)
  // })
})

