import { GENDER } from '../constant';

export const calculateBMI = (height: number, weight: number): number => {
  const BMI: number = weight / (height / 100) ** 2;
  return BMI;
};

export const convertKgToPound = (weight: number): number => {
  return weight / 0.45359237;
};

export const convertCmToInches = (height: number): number => {
  return height / 2.54;
};

export const round = (value: number, digits: number = 2) => {
  value = value * Math.pow(10, digits);
  value = Math.round(value);
  value = value / Math.pow(10, digits);
  return value;
}

export const calculateBMR = (
  gender: GENDER,
  weight: number,
  height: number,
  age: number,
): number => {
  if (gender === 'male') {
    return (
      66 +
      6.23 * convertKgToPound(weight) +
      12.7 * convertCmToInches(height) -
      6.8 * age
    );
  }
  if (gender === 'female') {
    return (
      655 +
      4.35 * convertKgToPound(weight) +
      4.7 * convertCmToInches(height) -
      4.7 * age
    );
  }
  return 1;
};

export const calculateTDEE = (
  gender: GENDER,
  weight: number,
  height: number,
  age: number,
  activity: number,
) => {
  const BMR = calculateBMR(gender, weight, height, age);
  const TDEE = BMR * activity;
  return { BMR, TDEE };
};
