
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
    super('array', constraints)

    this.min = constraints.min
    this.max = constraints.max
    this.length = constraints.length
  }

  min?: Constraint;
  max?: Constraint;
  length?: Constraint;

  toResolver(subResolver: any, key: string, dependencies: any) {
    let resolver = yup.array();

    if (this.min) {
      resolver = resolver.min(Number(this.min.value), this.min.message)
    }
    if (this.max) {
      resolver = resolver.max(Number(this.max.value), this.max.message)
    }
    if (this.length) {
      resolver = resolver.length(Number(this.length.value), this.length.message)
    }

    if (subResolver) {
      resolver = resolver.of(subResolver).ensure()
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}