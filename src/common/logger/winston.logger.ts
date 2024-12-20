import * as winston from 'winston';

export const errorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return {
      ...info,
      message: info.message,
      stack: info.stack,
    };
  }
  return info;
});

export const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);
