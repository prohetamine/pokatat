let langState = {
  selected: 'ru',
  items_langs: [{
      label: 'Русский ',
      value: 'ru'
  }, {
    label: 'English',
    value: 'en'
  }, {
      label:  'Український',
      value: 'ua'
  }],
  ru: {
    auth: {
      registration: {
        registration_button: 'регистрация',
        lang: {
          title: 'ВЫБЕРИТЕ ЯЗЫК',
          description: 'Вы всегда сможете изменить возраст в профиле позже.'
        },
        username: {
          title: 'ИМЯ ПОЛЬЗОВАТЕЛЯ',
          placeholder: 'Меня зовут..',
          description: 'Вы всегда сможете изменить имя в профиле позже.'
        },
        date: {
          title: 'ГОД РОЖДЕНИЯ',
          description: 'Вы всегда сможете изменить возраст в профиле позже.'
        },
        geo: {
          title: 'МЕСТОПОЛОЖЕНИЕ',
          description: 'Вы всегда сможете определить другой город в профиле позже.',
          placeholder: 'определить город'
        },
        map: {
          title: 'МЕСТОПОЛОЖЕНИЕ',
          description: 'Вы всегда сможете определить другой город в профиле позже.'
        },
        photo: {
          title: 'ФОТО ПРОФИЛЯ',
          placeholder: ['загрузить с телефона', 'загрузить с компютера'],
          description: 'Вы всегда сможете изменить фото в профиле позже.'
        },
        section: {
          title: 'ВЫБЕРИТЕ РАЗДЕЛ',
          type: [
            'Мотоциклы',
            'Квадроциклы',
            'Велосипеды',
            'Коньки',
            'Самокаты',
            'Коньки',
            'Скейтборд',
            'Сноуборд',
            'Лыжи',
            'Машины',
            'Лодки',
            'Другое'
          ],
          description: 'Вы всегда сможете изменить раздел в профиле позже.'
        },
        phone: {
          title: 'НОМЕР ТЕЛЕФОНА',
          placeholder: '+7 (928) 148 86-77',
          description: 'Вы всегда сможете изменить телефон в профиле позже.'
        }
      },
      login: {

      }
    },
    global: {
      show_all: 'показать всё',
    },
    navigation: {
      profile: 'ПРОФИЛЬ',
      users: 'ПОЛЬЗОВАТЕЛИ',
      requests: 'РЕКВЕСТЫ',
    },
    users_navigation: {
      years: ['лет', 'года'],
      filter: 'фильтр',
      friends: 'друзья',
      users: 'пользователи',
      subscribes: 'отклоненые',
      search_placeholder: 'Найдется все ..',

    },
    requests_navigation: {
      filter: 'фильтр',
      search: 'поиск',
      active: 'активные',
      history: 'история',
      search_placeholder: 'Название ...'
    },
    filter: {
      km: 'км',
      city: 'город',
      radius: 'радиус',
      city_not_defined: 'не определен',
    },
    friends: {
      new: 'Новые друзья',
      subscribe: 'Отклоненные',
      invite: 'Заявки в друзья',
      approved: 'Друзья'
    },
    users: {
      subscribed_to: 'Подписки',
      other_users: 'Пользователи'
    },
    requests: {
      search_list_title: 'Поиск',
      request_to_list_title: 'Запросы на участие',
      invites_list_title: 'Приглашения',
      active_list_title: 'Активные',
      history_list_title: 'История',
      user_count_prefix: 'чел.',
    }
  },
  en: {
    auth: {
      registration: {
        registration_button: 'registration',
        lang: {
            title: 'SELECTED LANGUAGE',
            description: 'You can always change the language in your profile later.'
        },
        username: {
          title: 'USER NAME',
          placeholder: 'My name is...',
          description: 'You can always change your profile name later.'
        },
        date: {
          title: 'YEAR OF BIRTH',
          description: 'You can always change the age in your profile later.'
        },
        geo: {
          title: 'МЕСТОПОЛОЖЕНИЕ',
          description: 'Вы всегда сможете определить другой город в профиле позже.',
          placeholder: 'определить город'
        },
        map: {
          title: 'ГОРОД',
          placeholder: 'Город..',
          description: 'Вы всегда сможете определить другой город в профиле позже.'
        },
        photo: {
          title: 'ФОТО ПРОФИЛЯ',
          placeholder: ['загрузить с телефона', 'загрузить с компютера'],
          description: 'Вы всегда сможете изменить фото в профиле позже.'
        }
      },
      login: {

      }
    },
    global: {
      show_all: 'show all',
    },
    navigation: {
      profile: 'PROFILE',
      users: 'USERS',
      requests: 'REQUESTS'
    },
    users_navigation: {
      years: ['age', 'years'],
      filter: 'filter',
      friends: 'friends',
      users: 'users',
      subscribes: 'subscribes',
      search_placeholder: 'Finds all ...',
    },
    requests_navigation: {
      filter: 'filter',
      search: 'search',
      active: 'active',
      history: 'history',
      search_placeholder: 'Title ...'
    },
    filter: {
      radius: 'radius',
      km: 'km',
      city: 'city',
      city_not_defined: 'not defined'
    },
    friends: {
      invite: 'Friend request',
      approved: 'Friends',
      subscribe: 'Subscribers'
    },
    users: {
      subscribed_to: 'Subscriptions',
      other_users: 'Users'
    },
    requests: {
      search_list_title: 'Search',
      request_to_list_title: 'Запросы на участие',
      invites_list_title: 'Invites',
      active_list_title: 'Active',
      history_list_title: 'History',
      user_count_prefix: 'pers.',
    }
  },
  ua: {
    auth: {
      registration: {
        registration_button: 'реєстрація',
        lang: {
          title: 'ВИБЕРІТЬ МОВУ',
          description: 'Ви завжди зможете змінити мову в профілі пізніше.'
        },
        username: {
          title: "ІМ'Я КОРИСТУВАЧА",
          placeholder: 'Мене звуть...',
          description: "Ви завжди зможете змінити ім'я в профілі пізніше."
        },
        date: {
          title: 'РІК НАРОДЖЕННЯ',
          description: 'Ви завжди зможете змінити вік в профілі пізніше.'
        },
        geo: {
          title: 'МЕСТОПОЛОЖЕНИЕ',
          description: 'Вы всегда сможете определить другой город в профиле позже.',
          placeholder: 'определить город'
        },
        map: {
          title: 'ГОРОД',
          placeholder: 'Город..',
          description: 'Вы всегда сможете определить другой город в профиле позже.'
        },
        photo: {
          title: 'ФОТО ПРОФИЛЯ',
          placeholder: ['загрузить с телефона', 'загрузить с компютера'],
          description: 'Вы всегда сможете изменить фото в профиле позже.'
        }
      },
      login: {

      }
    },
    global: {
      show_all: 'показати все',
    },
    navigation: {
      profile: 'ПРОФІЛЬ',
      users: 'КОРИСТУВАЧ',
      requests: 'РЕКВЕСТИ',
    },
    users_navigation: {
      years: ['років', 'роки'],
      filter: 'фільтр',
      friends: 'друзі',
      users: 'користувач',
      subscribes: 'Відхилені',
      search_placeholder: 'Назва ...'
    },
    requests_navigation: {
      filter: 'фільтр',
      search: 'пошук',
      active: 'активний',
      history: 'історія',
      search_placeholder: 'Назва ...'
    },
    filter: {
      radius: 'радіус',
      km: 'км',
      city: 'місто',
      city_not_defined: 'не визначено',
    },
    friends: {
      invite: 'Заявка в друзі',
      approved: 'Друзі',
      subscribe: 'Відхилені'
    },
    users: {
      subscribed_to: 'Подписки',
      other_users: 'Користувачи'
    },
    requests: {
      search_list_title: 'Пошук',
      request_to_list_title: 'Запросы на участие',
      invites_list_title: 'Запрошення',
      active_list_title: 'Невсипущі',
      history_list_title: 'Історія',
      user_count_prefix: 'чол.',
    }
  }
}

//langState = localStorage.langState ? JSON.parse(localStorage.langState) : langState

function lang (state = langState, action) {

  if (action.type === 'SET_LANG') {
    return {
      ...state,
      selected: action.payload
    }
  }

  return state
}

export default lang
