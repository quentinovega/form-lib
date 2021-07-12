export interface Constraint {
  value: string | number | Date;
  message: string;
  ref?: string | number;
  test?: () => boolean;
}

export type BaseResolverConstraints = {
  required?: Constraint;
  test?: Constraint;
  when?: Constraint;
}