import { BaseResolverConstraints, Constraint } from './types';
import * as yup from 'yup'

export class BaseResolver {
  constructor(constraints: BaseResolverConstraints) {
    this.required = constraints.required
    this.test = constraints.test
  }

  required?: Constraint;
  test?: Constraint;
  // when?: Constraint;

  toBaseResolver(yupResolver: yup.AnySchema, key: string, dependencies: any) {
    let baseResolver = yupResolver;
    if (this.required) {
      baseResolver = baseResolver.required(this.required.message)
    }
    if (this.test && this.test.ref && this.test.test) {
      baseResolver = baseResolver.test(String(this.test.ref), this.test.message, this.test.test)
      dependencies.push([key , this.test.ref])
    }
    
    return baseResolver
  }
}