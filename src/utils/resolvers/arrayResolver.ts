
import * as yup from 'yup';
import { BaseResolverConstraints, Constraint } from './types';
import { BaseResolver } from './baseResolver';

type ArrayResolverConstraints = {
  min?: Constraint;
  max?: Constraint;
  length?: Constraint;
  //todo: of
}

export class ArrayResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & ArrayResolverConstraints) {
    super(constraints)
  }

  toResolver(subResolver: any) {
    let resolver = yup.array();

    if (subResolver) {
      resolver = resolver.of(subResolver)
    }

    return super.toBaseResolver(resolver)
  }
}