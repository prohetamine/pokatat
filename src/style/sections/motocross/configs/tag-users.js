const notExist = {
  id: 0,
  type: 'static:custom',
  label: {
    ru: 'Несуществующий ID',
    en: 'NONEXISTENT ID',
    ua: 'Нэиснуючий ID'
  }
}

const filter = [{
    id: 1,
    label: {
      ru: 'катаю',
      en: 'skate',
      ua: 'катаю'
    },
    icon: 'tag-helmet',
    bgcolor: '#5EDE82'
  }, {
    id: 2,
    label: {
      ru: 'не катаю',
      en: 'not skate',
      ua: 'не катаю'
    },
    icon: 'tag-helmet',
    bgcolor: '#F36464'
  }, {
    id: 3,
    label: {
      ru: 'возможно катаю',
      en: 'maybe skate',
      ua: 'можливо катаю'
    },
    icon: 'tag-helmet',
    bgcolor: '#ECD06E'
  }, {
    id: 4,
    label: {
      ru: 'нужна помощь',
      en: 'need help',
      ua: 'потрібна допомога'
    },
    icon: 'tag-help',
    bgcolor: '#B55EDE'
  }, {
    id: 5,
    label: {
      ru: 'новичек',
      en: 'novice',
      ua: 'новачок'
    },
    icon: 'tag-skill',
    bgcolor: '#5EDE63'
  }, {
    id: 6,
    label: {
      ru: 'любитель',
      en: 'dilettante',
      ua: 'любитель'
    },
    icon: 'tag-skill',
    bgcolor: '#8FDE5E'
  }, {
    id: 7,
    label: {
      ru: 'практикант',
      en: 'trainee',
      ua: 'практикант'
    },
    icon: 'tag-skill',
    bgcolor: '#DED15E'
  }, {
    id: 8,
    label: {
      ru: 'опытный',
      en: 'skilled',
      ua: 'досвідчений'
    },
    icon: 'tag-skill',
    bgcolor: '#DE9C5E'
  }, {
    id: 9,
    label: {
      ru: 'профи',
      en: 'pro',
      ua: 'профі'
    },
    icon: 'tag-skill',
    bgcolor: '#DE755E'
  }, {
    id: 10,
    label: {
      ru: 'убер',
      en: 'uber',
      ua: 'убер'
    },
    icon: 'tag-skill',
    bgcolor: '#DE5E5E'
  }, {
    id: 17,
    label: {
      ru: 'телефон',
      en: 'telephone',
      ua: 'телефон'
    },
    icon: 'tag-phone'
  }
]


const all = [{
    id: 11,
    label: {
      ru: 'время',
      en: 'time',
      ua: 'час'
    }
  }, {
    id: 12,
    label: {
      ru: 'каток',
      en: 'skater',
      ua: 'каток'
    }
  }, {
    id: 13,
    label: {
      ru: 'реквестов',
      en: 'requests',
      ua: 'реквестів'
    }
  }, {
    id: 14,
    label: {
      ru: 'пригласил',
      en: 'invited',
      ua: 'запросив'
    }
  }, {
    id: 15,
    label: {
      ru: 'друзей',
      en: 'friends',
      ua: 'друзів'
    }
  }, {
    id: 16,
    label: {
      ru: 'катаю на',
      en: 'skate with',
      ua: 'катаю на'
    }
  }, {
    id: 17,
    label: {
      ru: 'тел. ',
      en: 'tel. ',
      ua: 'трубка. '
    },
    filterLabel: {
      ru: 'телефон',
      en: 'telephone',
      ua: 'телефон'
    },
    icon: 'tag-phone'
  }, {
    id: 18,
    type: 'custom:icon',
    icon: 'tag-place',
    bgcolor: '#DEDEDE'
  }, {
    id: 999
  },
  notExist,
  ...filter
]

module.exports = {
  all,
  filter
}
