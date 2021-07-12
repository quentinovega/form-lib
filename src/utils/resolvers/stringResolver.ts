import * as yup from 'yup';
import { BaseResolverConstraints, Constraint } from './types';
import { BaseResolver } from './baseResolver';

type StringResolverConstraints = {
  min?: Constraint;
  max?: Constraint;
  email?: Constraint;
  url?: Constraint;
  uuid?: Constraint;
  matches?: Constraint;
}

export class StringResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & StringResolverConstraints) {
    super(constraints)

    this.min = constraints.min
    this.max = constraints.max
    this.email = constraints.email
    this.url = constraints.url
    this.uuid = constraints.uuid
    this.matches = constraints.matches
  }

  min?: Constraint;
  max?: Constraint;
  email?: Constraint;
  url?: Constraint;
  uuid?: Constraint;
  matches?: Constraint;

  toResolver() {
    const test = yup.string();

    return super.toBaseResolver(test)
  }
}