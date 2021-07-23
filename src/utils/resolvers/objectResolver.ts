
import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';
import { buildResolver } from '../form'

type ObjectResolverConstraints = {
  // shape?: any
  noUnknown ?: Constraints.NoUnknownConstraint
  schema?: object
}

export class ObjectResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & ObjectResolverConstraints) {
    super('object', constraints)

    this.schema = constraints.schema
    this.noUnknown = constraints.noUnknown
  }

  schema?: object
  noUnknown?: Constraints.NoUnknownConstraint

  toResolver(key: string, dependencies: any) {
    let resolver = yup.object()

    // if (this.schema) {
    //   resolver = resolver.shape(buildResolver(this.schema), dependencies) //FIXME: comprendre le bail
    // }
    if (this.noUnknown) {
      resolver = resolver.noUnknown(this.noUnknown.onlyKnownKeys, this.noUnknown.message)
    }

    return super.toBaseResolver(resolver, key, dependencies)
      .test('test', 'no empty key allowed', v => Object.keys(v).every(k => k !== ''))
  }
}