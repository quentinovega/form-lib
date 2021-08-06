
import * as yup from 'yup';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';
import { BaseResolverConstraints } from './baseResolver';

type ArrayResolverConstraints = {
  min?: Constraints.NumberConstraint;
  max?: Constraints.NumberConstraint;
  length?: Constraints.NumberConstraint;
}

export class ArrayResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & ArrayResolverConstraints) {
    super('array', constraints)

    this.min = constraints.min
    this.max = constraints.max
    this.length = constraints.length
  }

  min?: Constraints.NumberConstraint;
  max?: Constraints.NumberConstraint;
  length?: Constraints.NumberConstraint;

  toResolver(subResolver: any, key: string, dependencies: any) {
    let resolver = yup.array();

    if (this.min) {
      resolver = resolver.min(this.min.value, this.min.message)
    }
    if (this.max) {
      resolver = resolver.max(this.max.value, this.max.message)
    }
    if (this.length) {
      resolver = resolver.length(this.length.value, this.length.message)
    }

    if (subResolver) {
      resolver = resolver.of(subResolver).ensure()
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}