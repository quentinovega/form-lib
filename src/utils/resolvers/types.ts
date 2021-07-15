export interface Constraint {
  value: string | number | Date ;
  arrayOfValues?: any[]
  message: string;
  ref?: string | number;
  test?: (val: any) => boolean;
  regexp?:RegExp
  then?: object
  otherwise?: object
}

export type BaseResolverConstraints = {
  required?: Constraint;
  test?: Constraint;
  when?: Constraint;
  oneOf?: Constraint;
}