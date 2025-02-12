import { dniReg, emailReg, phoneReg } from '@/utils/regex/regex';
import dayjs from 'dayjs';

export const validateMaxValue = (value: number, max: number): string | null => {
  if (!max) return null;
  let message = '';

  if (typeof value === 'undefined' || !value) {
    message = 'El valor es requerido';
    return message;
  }
  if (Number(value) > Number(max)) {
    message = 'El valor máximo es ' + max;
    return message;
  }
  return null;
};
export const validateEmail = (email: string): string | null => {
  if (typeof email !== 'string') return null;
  let message = '';
  if (typeof email == 'undefined' || email === '') {
    message = 'Email requerido';
    return message;
  }
  if (!email.match(emailReg)) {
    message = 'Email invalido';
    return message;
  }
  return null;
};

export const validateDNI = (dni: string, required?: boolean): string | null => {
  let message = '';
  if (required) {
    if (typeof dni == 'undefined' || dni === '') {
      message = 'DNI requerido';
      return message;
    }
  }
  if (dni === '') return null;
  if (!String(dni)?.match(dniReg)) {
    message = 'DNI inválido';
    return message;
  }

  return null;
};
export const validatePhone = (
  phone: string,
  required?: boolean
): string | null => {
  let message = '';
  if (required) {
    if (typeof phone == 'undefined' || phone === '') {
      message = 'Teléfono requerido';
      return message;
    }
  }
  if (phone === '') return null;
  if (!phone.match(phoneReg)) {
    message = 'Número de teléfono inválido';
    return message;
  }

  return null;
};

export const validateDOB = (birthDate: string): string | null => {
  let message: string | null = '';
  if (typeof birthDate === 'undefined' || birthDate === '') {
    message = 'Campo requerido';
    return message;
  }
  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const dobDate = new Date(birthDate);

  message = validDate(birthDate);
  if (message) return message;
  if (dobDate > minAgeDate) {
    message = 'Debes tener 18 años o más';
    return message;
  }

  return null;
};

export const validateFromToDates = (to: string, from: string) => {
  let message: string | null = '';
  if (typeof from === 'undefined' || from === '') {
    return 'Campo requerido';
  }
  message = validDate(from);
  if (message) return message;
  if (to && from) {
    if (dayjs(to).format('YYYY-MM-DD') <= dayjs(from).format('YYYY-MM-DD')) {
      return (
        'Esta fecha debe ser posterior a ' + dayjs(from).format('YYYY-MM-DD')
      );
    }
  }
  return null;
};
export const validDate = (value: string) => {
  if (!value) return null;

  const date = dayjs(value).toDate();
  if (isNaN(date.getTime())) {
    return 'Formato de fecha incorrecto';
  }
  const currentDate = new Date();
  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(currentDate.getFullYear() - 100);
  const hundredYearsFromNow = new Date();
  hundredYearsFromNow.setFullYear(currentDate.getFullYear() + 100);
  if (date < hundredYearsAgo || date > hundredYearsFromNow) {
    return 'Fecha fuera de rango';
  }
  return null;
};

export const validateFeatures = (features: number): string | null => {
  let message = '';
  if (features < 1) {
    message = 'Agrega al menos una caracteristica';
    return message;
  }
  return null;
};
