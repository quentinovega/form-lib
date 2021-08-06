import * as Constraints from './types';
import * as yup from 'yup'

import { buildSubResolver } from '../form';

export type BaseResolverConstraints = {
  required?: Constraints.SimpleConstraint;
  test?: Constraints.TestConstraint | Array<Constraints.TestConstraint>;
  when?: Constraints.WhenConstraint | Array<Constraints.WhenConstraint>;
  oneOf?: Constraints.OneOfConstraint;
}

export class BaseResolver {
  constructor(type: string, constraints: BaseResolverConstraints) {
    this.type = type

    this.required = constraints.required
    this.test = constraints.test
    this.when = constraints.when
    this.oneOf = constraints.oneOf
  }
  type: string

  required?: Constraints.SimpleConstraint;
  test?: Constraints.TestConstraint | Array<Constraints.TestConstraint>;
  when?: Constraints.WhenConstraint | Constraints.WhenConstraint[];
  oneOf?: Constraints.OneOfConstraint;

  toBaseResolver(yupResolver: yup.AnySchema, key: string, dependencies: any) {
    let baseResolver = yupResolver;
    if (this.required) {
      baseResolver = baseResolver.required(this.required.message)
    }
    if (this.test) {
      if (Array.isArray(this.test)) {
        this.test.forEach(t => {
          baseResolver = baseResolver.test(String(t.ref), t.message, t.test)
          dependencies.push([key, t.ref])
        })
      } else {
        baseResolver = baseResolver.test(String(this.test.ref), this.test.message, this.test.test)
        dependencies.push([key, this.test.ref])
      }
    }

    if (this.oneOf) {
      baseResolver = baseResolver.oneOf(this.oneOf.arrayOfValues || [], this.oneOf.message)
    }

    if (!!this.when) {
      if (Array.isArray(this.when)) {
        this.when.forEach(when => {
          baseResolver = baseResolver.when([String(when.ref)], {
            is: (val: any) => when.test(val),
            then: buildSubResolver({ type: this.type, constraints: when.then }, key, dependencies),
            otherwise: buildSubResolver({ type: this.type, constraints: when.otherwise }, key, dependencies)
          })
          dependencies.push([key, when.ref])
        })
      } else {
        baseResolver = baseResolver.when([String(this.when.ref)], {
          is: (val: any) => !Array.isArray(this.when) && this.when?.test(val),
          then: buildSubResolver({ type: this.type, constraints: this.when.then }, key, dependencies),
          otherwise: buildSubResolver({ type: this.type, constraints: this.when.otherwise }, key, dependencies)
        })
        dependencies.push([key, this.when.ref])
      }
    }

    return baseResolver
  }
}