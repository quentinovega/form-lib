
import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import { BaseResolver } from './baseResolver';

export class BooleanResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints) {
    super('boolean', constraints)
  }

  toResolver(key: string, dependencies: any) {
    let resolver = yup.bool(); 

    return super.toBaseResolver(resolver, key, dependencies)
  }
}