export const ErrorCodeToMessageMapper: Record<string, string> = {
  UNKNOWN_ERROR: 'An unknown error occurred, please try again later',
  HTTP_ERROR: 'Connection error, please try again later',
  GRAMMY_ERROR: 'Something went wrong, please try again later',

  USER_PERSISTENCE_FAILED: 'An internal error occurred, please try again later',
  FIRST_NAME_TOO_LONG: 'Your profile name is too long, please change it',
  FIRST_NAME_TOO_SHORT: 'Your profile name is too short, please change it',
  INVALID_TELEGRAM_ID: 'Your Telegram ID is invalid, please try again later',

  DUPLICATE_URL: 'An account with this URL has already been added',
  FAILED_TO_SAVE: 'There was an error saving your account. Please try again later',
  HANDLE_TO_LONG: 'You have entered a profile name that is too long',
  HANDLE_TO_SHORT: 'You have entered a profile name that is too short',
  INVALID_HANDLE: 'You have entered an invalid profile name',
  INVALID_PLATFORM: 'You have selected an invalid platform',
  NOT_SUPPORTED_PLATFORM: 'The selected platform is not supported',

  VALIDATION_ERROR: 'Error validating submitted data, please try again',
  NESTJS_ERROR: 'An internal error occurred, please try again later',
};
