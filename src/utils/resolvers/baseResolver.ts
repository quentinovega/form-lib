import { BaseResolverConstraints, Constraint } from './types';
import * as yup from 'yup'

import {buildSubResolver} from '../form';

export class BaseResolver {
  constructor(type: string, constraints: BaseResolverConstraints) {
    this.type = type
    
    this.required = constraints.required
    this.test = constraints.test
    this.when = constraints.when
  }
  type: string

  required?: Constraint;
  test?: Constraint;
  when?: Constraint;

  toBaseResolver(yupResolver: yup.AnySchema, key: string, dependencies: any) {
    let baseResolver = yupResolver;
    if (this.required) {
      baseResolver = baseResolver.required(this.required.message)
    }
    if (this.test && this.test.ref && this.test.test) {
      baseResolver = baseResolver.test(String(this.test.ref), this.test.message, this.test.test)
      dependencies.push([key , this.test.ref])
    }

    if (!!this.when && this.when.ref) {
      baseResolver = baseResolver.when(String(this.when.ref), {
        is: (val: any) => this.when?.test && this.when?.test(val),
        then: buildSubResolver({type: this.type, constraints: this.when.then}, key, dependencies),
        otherwise: buildSubResolver({ type: this.type, constraints: this.when.then }, key, dependencies)
      })
    }
    
    return baseResolver
  }
}