import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

type numeral = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type ISBN13 = `${numeral}${numeral}${numeral}-${number}`;

@ValidatorConstraint()
export class isISBN13 implements ValidatorConstraintInterface{
    validate(value: string, validationArguments?: ValidationArguments | undefined): boolean | Promise<boolean> {
        return /^\d{3}-\d{10}$/.test(value);
    }
    defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
        return "The format of the ISBN is wrong";
    }
}