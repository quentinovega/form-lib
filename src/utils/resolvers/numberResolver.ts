
import * as yup from 'yup';
import { BaseResolverConstraints, Constraint } from './types';
import { BaseResolver } from './baseResolver';

type NumberResolverConstraints = {
  min?: Constraint;
  max?: Constraint;
  positive?: Constraint;
  negative?: Constraint;
  integer?: Constraint;
  lessThan?: Constraint;
  moreThan?: Constraint;
}

export class NumberResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & NumberResolverConstraints) {
    super(constraints)

    this.min = constraints.min
    this.max = constraints.max
    this.positive = constraints.positive
    this.negative = constraints.negative
    this.integer = constraints.integer
    this.lessThan = constraints.lessThan
  }

  min?: Constraint;
  max?: Constraint;
  positive?: Constraint;
  negative?: Constraint;
  integer?: Constraint;
  lessThan?: Constraint;
  moreThan?: Constraint;

  toResolver() {
    let resolver = yup.number();



    // if (props.multi || props.format === 'array') {
    //   resolver = yup.array().of(yup.number()).ensure()
    // }
    // //todo: if option && multi ...
    // if (required) {
    //   resolver = resolver.required(required.message)
    // }
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
      resolver = resolver.min(Number(this.min.value), this.min.message)
    }
    if (this.max) {
      resolver = resolver.max(Number(this.max.value), this.max.message)
    }
    if (this.moreThan && this.moreThan.ref) {
      resolver = resolver.moreThan(Number(this.moreThan.ref), this.moreThan.message)
      // dependencies.push([key, moreThan.ref])
    }
    if (this.lessThan && this.lessThan.ref) {
      resolver = resolver.lessThan(Number(this.lessThan.ref), this.lessThan.message)
      // dependencies.push([key, lessThan.ref])
    }

    return super.toBaseResolver(resolver)
  }
}