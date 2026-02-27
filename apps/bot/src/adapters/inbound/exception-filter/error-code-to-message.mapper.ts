export const ErrorCodeToMessageMapper: Record<string, string> = {
  UNKNOWN_ERROR: 'Произошла неизвестная ошибка, попробуйте позже',
  HTTP_ERROR: 'Ошибка соединения, попробуйте позже',
  GRAMMY_ERROR: 'Что-то пошло не так, попробуйте позже',

  USER_PERSISTENCE_FAILED: 'Произошла внутренняя ошибка, попробуйте позже',
  FIRST_NAME_TOO_LONG: 'У вас слишком длинное название профиля, пожалуйста измените его',
  FIRST_NAME_TOO_SHORT: 'У вас слишком короткое название профиля, пожалуйста измените его',
  INVALID_TELEGRAM_ID: 'У вас невалидный telegram id, попробуйте позже',

  VALIDATION_ERROR: 'Ошибка при валидации переданных данных, попробуйте ещё раз',
  NESTJS_ERROR: 'Произошла внутренняя ошибка, попробуйте позже',
};
