
import * as yup from 'yup';
import { BaseResolverConstraints, Constraint } from './types';
import { BaseResolver } from './baseResolver';

type ObjectResolverConstraints = {
  shape?: any
  noUnknown ?: Constraint
}

export class ObjectResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & ObjectResolverConstraints) {
    super('object', constraints)

    this.shape = constraints.shape
    this.noUnknown = constraints.noUnknown
  }

  shape: Constraint
  noUnknown?: Constraint

  toResolver(key: string, dependencies: any) {
    let resolver = yup.object()

    return super.toBaseResolver(resolver, key, dependencies)
      .test('test', 'no empty key allowed', v => Object.keys(v).every(k => k !== ''))
  }
}