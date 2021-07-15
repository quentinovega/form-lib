
import * as yup from 'yup';
import { BaseResolverConstraints, Constraint } from './types';
import { BaseResolver } from './baseResolver';

type ObjectResolverConstraints = {
  shape?: any
}

export class ObjectResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & ObjectResolverConstraints) {
    super('object', constraints)

    this.shape = constraints.shape
  }

  shape: Constraint

  toResolver(key: string, dependencies: any) {
    let resolver = yup.object();

    return super.toBaseResolver(resolver, key, dependencies)
  }
}