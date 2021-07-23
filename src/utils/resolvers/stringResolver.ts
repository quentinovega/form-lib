import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraint from './types';
import { BaseResolver } from './baseResolver';

type StringResolverConstraints = {
  min?: Constraint.NumberConstraint;
  max?: Constraint.NumberConstraint;
  email?: Constraint.SimpleConstraint;
  url?: Constraint.SimpleConstraint;
  uuid?: Constraint.SimpleConstraint;
  matches?: Constraint.MatcheConstraint;
}

export class StringResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & StringResolverConstraints) {
    super('string', constraints)

    this.min = constraints.min
    this.max = constraints.max
    this.email = constraints.email
    this.url = constraints.url
    this.uuid = constraints.uuid
    this.matches = constraints.matches
  }

  min?: Constraint.NumberConstraint;
  max?: Constraint.NumberConstraint;
  email?: Constraint.SimpleConstraint;
  url?: Constraint.SimpleConstraint;
  uuid?: Constraint.SimpleConstraint;
  matches?: Constraint.MatcheConstraint;

  toResolver(key: string, dependencies: any) {
    let resolver = yup.string();

    if (this.min) {
      resolver = resolver.min(this.min.value, this.min.message)
    }
    if (this.max) {
      resolver = resolver.max(this.max.value, this.max.message)
    }
    if (this.email) {
      resolver = resolver.email(this.email.message)
    }
    if (this.url) {
      resolver = resolver.url(this.url.message)
    }
    if (this.uuid) {
      resolver = resolver.uuid(this.uuid.message)
    }
    if (this.matches) {
      resolver = resolver.matches(this.matches.regexp, { message: this.matches.message})
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}