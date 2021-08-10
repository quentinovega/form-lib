import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import { BaseResolver } from './baseResolver';
export declare class BooleanResolver extends BaseResolver {
    constructor(constraints: BaseResolverConstraints);
    toResolver(key: string, dependencies: any): yup.AnySchema<any, any, any>;
}
