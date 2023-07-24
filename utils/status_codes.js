module.exports.STATUS_CODE_OK = {
  code: 200,
  message: 'Allreary Ok!',
};
module.exports.STATUS_CODE_CREATED = {
  code: 201,
  message: 'Item created',
};
module.exports.BAD_REQUEST_CODE = {
  code: 400,
  message: 'Введенные данные не корректны',
};
module.exports.UNAUTHORIZED_ERROR_CODE = {
  code: 401,
  messages: {
    authorizationError: 'Ошибка авторизации',
    incorrectEmailOrPassword: 'Неверный адрес почты или пароль',
  },
};
module.exports.FORBIDDEN_ERROR_CODE = {
  code: 403,
  message: 'Недостаточно прав для удаления этого фильма',
};
module.exports.NOT_FOUND_ERROR_CODE = {
  code: 404,
  messages: {
    userIsNotFound: 'Профиль пользователя не найден',
    movieIsNotFound: 'Фильм не найден',
    pageIsNotFound: 'Страница не найдена',
  },
};
module.exports.DUPLICATE_DATA_ERROR_CODE = {
  code: 409,
  message: 'Пользователь уже зарегистрирован',
};
module.exports.INTERNAL_SERVER_ERROR_CODE = {
  code: 500,
  message: 'Внутренняя ошибка сервера',
};
