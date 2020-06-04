import { Entity } from '../entity';
import { DynamicField } from './dynamic-field';

export const GEN_CONDITION_IF = {
  changeValue: 'change_value',
};
export enum CONDITION_COMPARE {
  LIKE = 'LIKE',
  EQUALS = 'EQUALS',
  LESS_EQUALS = 'LESS-EQUALS',
  GREATER_EQUALS = 'GREATER-EQUALS'
}
export class DynamicFieldConditionIf{
  // Si no se pasa nada por defecto es la generica
  key?: string;
  value?: any;
  compare?: string;
  toField?: string;
  group?: DynamicFieldConditionIf[];
}
