import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

interface CatChildren {
  identifier: string;
  name: string;
  age: number;
}

@ValidatorConstraint({ async: true })
export class IsRepeatIdentifierId implements ValidatorConstraintInterface {
  private repeatIdentifier: string;
  private repeatIdentifierIndex: number;

  validate(args: CatChildren[]): Promise<boolean> | boolean {
    const identifierIndexMap = new Map();
    for (let i = 0; i < args.length; i++) {
      const identifier = args[i].identifier;

      if (identifierIndexMap.has(identifier)) {
        this.repeatIdentifier = identifier;
        this.repeatIdentifierIndex = identifierIndexMap.get(identifier);
        return false;
      }
      identifierIndexMap.set(identifier, i);
    }

    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `catChildren.${this.repeatIdentifierIndex}.must be unique(repeat key：${this.repeatIdentifier})`;
  }
}

export function IsIdentifierRepeat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRepeatIdentifierId,
    });
  };
}
