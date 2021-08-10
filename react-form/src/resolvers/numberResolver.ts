
import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';

type NumberResolverConstraints = {
  min?: Constraints.NumberReferenceConstraint;
  max?: Constraints.NumberReferenceConstraint;
  positive?: Constraints.SimpleConstraint;
  negative?: Constraints.SimpleConstraint;
  integer?: Constraints.SimpleConstraint;
  lessThan?: Constraints.NumberReferenceConstraint;
  moreThan?: Constraints.NumberReferenceConstraint;
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

  min?: Constraints.NumberReferenceConstraint;
  max?: Constraints.NumberReferenceConstraint;
  positive?: Constraints.SimpleConstraint;
  negative?: Constraints.SimpleConstraint;
  integer?: Constraints.SimpleConstraint;
  lessThan?: Constraints.NumberReferenceConstraint;
  moreThan?: Constraints.NumberReferenceConstraint;

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
      resolver = resolver.min(this.min.ref, this.min.message)
    }
    if (this.max) {
      resolver = resolver.min(this.max.ref, this.max.message)
    }
    if (this.moreThan) {
      resolver = resolver.moreThan(this.moreThan.ref, this.moreThan.message)
      dependencies.push([key, this.moreThan.ref])
    }
    if (this.lessThan) {
      resolver = resolver.lessThan(this.lessThan.ref, this.lessThan.message)
      dependencies.push([key, this.lessThan.ref])
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}