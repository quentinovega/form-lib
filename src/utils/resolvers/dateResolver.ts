
import * as yup from 'yup';
import { BaseResolverConstraints, Constraint } from './types';
import { BaseResolver } from './baseResolver';

type DateResolverConstraints = {
  min?: Constraint;
  max?: Constraint;
}

export class DateResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & DateResolverConstraints) {
    super('date', constraints)

    this.min = constraints.min
    this.max = constraints.max
  }

  min?: Constraint;
  max?: Constraint;

  toResolver(key: string, dependencies: any) {
    let resolver = yup.date();


    // if (props.multi || props.format === 'array') {
    //   resolver = yup.array().of(yup.number()).ensure()
    // }
    // //todo: if option && multi ...
    // if (required) {
    //   resolver = resolver.required(required.message)
    // }
    if (this.min) {
      resolver = resolver.min(this.min.value, this.min.message)
    }
    if (this.max) {
      resolver = resolver.max(this.max.value, this.max.message)
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}