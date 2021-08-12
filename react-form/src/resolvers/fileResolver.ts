
import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';

type FileResolverConstraints = {
  supportedFormat?: Constraints.OneOfConstraint;
  unsupportedFormat?: Constraints.OneOfConstraint;
  maxSize?: Constraints.NumberConstraint;
}

export class FileResolver extends BaseResolver {
  constructor(constraints: BaseResolverConstraints & FileResolverConstraints) {
    super('file', constraints)

    this.supportedFormat = constraints.supportedFormat
    this.unsupportedFormat = constraints.unsupportedFormat
    this.maxSize = constraints.maxSize
  }

  supportedFormat?: Constraints.OneOfConstraint;
  unsupportedFormat?: Constraints.OneOfConstraint;
  maxSize?: Constraints.NumberConstraint;

  toResolver(key: string, dependencies: any) {
    let resolver = yup.mixed(); 

    if (this.supportedFormat) {
      const SUPPORTED_FORMATS = this.supportedFormat.arrayOfValues.map(f => f.toLowerCase());
      resolver = resolver.test('supportedFormat', this.supportedFormat.message, (value) => {
        if (!value.length) return true
        return SUPPORTED_FORMATS.some(format => value[0].type.toLowerCase().includes(format))
      })
    }

    if (this.unsupportedFormat) {
      const UNSUPPORTED_FORMATS = this.unsupportedFormat.arrayOfValues.map(f => f.toLowerCase());
      resolver = resolver.test('unsupportedFormat', this.unsupportedFormat.message, (value) => {
        if (!value.length) return true
        return UNSUPPORTED_FORMATS.every(format => !value[0].type.toLowerCase().includes(format))
      })
    }

    if (this.maxSize && this.maxSize.value) {
      const size = this.maxSize.value
      resolver = resolver.test('fileSize', this.maxSize.message, (value) => {
        if (!value.length) return true
        return value[0].size <= size
      })
    }

    return super.toBaseResolver(resolver, key, dependencies)
  }
}