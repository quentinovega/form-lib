
import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';

type DateResolverConstraints = {
  min?: Constraints.DateConstraint;
  max?: Constraints.DateConstraint;
}

export class DateResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & DateResolverConstraints) {
    super('date', constraints)

    this.min = constraints.min
    this.max = constraints.max
  }

  min?: Constraints.DateConstraint;
  max?: Constraints.DateConstraint;

  toResolver(key: string, dependencies: any) {
    let resolver = yup.date();

    if (this.min) {
      resolver = resolver.min(this.min.value, this.min.message)
    }
    if (this.max) {
      resolver = resolver.max(this.max.value, this.max.message)
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}