
import * as yup from 'yup';
import { BaseResolverConstraints, Constraint } from './types';
import { BaseResolver } from './baseResolver';

type BooleanResolverConstraints = {
  min?: Constraint;
  max?: Constraint;
  positive?: Constraint;
  negative?: Constraint;
  integer?: Constraint;
  lessThan?: Constraint;
  moreThan?: Constraint;
}

export class BooleanResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & BooleanResolverConstraints) {
    super(constraints)
  }

  toResolver() {
    let resolver = yup.bool(); 

    return super.toBaseResolver(resolver)
  }
}