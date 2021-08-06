
import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';

type NumberResolverConstraints = {
  min?: Constraints.NumberConstraint;
  max?: Constraints.NumberConstraint;
  positive?: Constraints.SimpleConstraint;
  negative?: Constraints.SimpleConstraint;
  integer?: Constraints.SimpleConstraint;
  lessThan?: Constraints.ReferenceConstraint;
  moreThan?: Constraints.ReferenceConstraint;
}

export class NumberResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & NumberResolverConstraints) {
    super('number', constraints)

    this.min = constraints.min
    this.max = constraints.max
    this.positive = constraints.positive
    this.negative = constraints.negative
    this.integer = constraints.integer
    this.lessThan = constraints.lessThan
  }

  min?: Constraints.NumberConstraint;
  max?: Constraints.NumberConstraint;
  positive?: Constraints.SimpleConstraint;
  negative?: Constraints.SimpleConstraint;
  integer?: Constraints.SimpleConstraint;
  lessThan?: Constraints.ReferenceConstraint;
  moreThan?: Constraints.ReferenceConstraint;

  toResolver(key: string, dependencies: any) {
    let resolver = yup.number();

    if (this.integer) {
      resolver = resolver.integer(this.integer.message)
    }
    if (this.positive) {
      resolver = resolver.positive(this.positive.message)
    }
    if (this.negative) {
      resolver = resolver.negative(this.negative.message)
    }
    if (this.min) {
      resolver = resolver.min(this.min.value, this.min.message)
    }
    if (this.max) {
      resolver = resolver.max(this.max.value, this.max.message)
    }
    if (this.moreThan) {
      if (typeof this.moreThan.ref === 'string') {
        resolver = resolver.moreThan(yup.ref(this.moreThan.ref), this.moreThan.message)
      }

      if (typeof this.moreThan.ref === 'number') {
        resolver = resolver.moreThan(Number(this.moreThan.ref), this.moreThan.message)
      }

      dependencies.push([key, this.moreThan.ref])
    }
    if (this.lessThan) {
      if (typeof this.lessThan.ref === 'string') {
        resolver = resolver.lessThan(yup.ref(this.lessThan.ref), this.lessThan.message)
      }

      if (typeof this.lessThan.ref === 'number') {
        resolver = resolver.lessThan(this.lessThan.ref, this.lessThan.message)
      }

      dependencies.push([key, this.lessThan.ref])
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}