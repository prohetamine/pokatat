const notExist = {
  id: 0,
  label: {
    ru: 'Несуществующий ID',
    en: 'NONEXISTENT ID',
    ua: 'Нэиснуючий ID'
  }
}

const filter = [{
  id: 1,
  label: {
    ru: 'открытые',
    en: 'open',
    ua: 'відкритий'
  },
  icon: 'tag-help'
}, {
  id: 2,
  label: {
    ru: 'закрытые',
    en: 'close',
    ua: 'закритий'
  },
  icon: 'tag-help'
}, {
  id: 3,
  label: {
    ru: 'по приглашению',
    en: 'by invitation',
    ua: 'на запрошення'
  },
  icon: 'tag-help'
}, {
  id: 4,
  label: {
    ru: 'новичок',
    en: 'novice',
    ua: 'новачок'
  },
  icon: 'tag-skill'
}, {
  id: 5,
  label: {
    ru: 'любитель',
    en: 'dilettante',
    ua: 'любитель'
  },
  icon: 'tag-skill'
}, {
  id: 6,
  label: {
    ru: 'практикант',
    en: 'trainee',
    ua: 'практикант'
  },
  icon: 'tag-skill'
}, {
  id: 7,
  label: {
    ru: 'опытный',
    en: 'skilled',
    ua: 'досвідчений'
  },
  icon: 'tag-skill'
}, {
  id: 8,
  label: {
    ru: 'профи',
    en: 'pro',
    ua: 'профі'
  },
  icon: 'tag-skill'
}, {
  id: 9,
  label: {
    ru: 'убер',
    en: 'uber',
    ua: 'убер'
  },
  icon: 'tag-skill'
}, {
  id: 10,
  label: {
    ru: 'время',
    en: 'time',
    ua: 'час'
  },
  icon: 'tag-help'
}]


const all = [{
  id: 1,
  label: {
    ru: 'открытые',
    en: 'open',
    ua: 'відкритий'
  },
  icon: 'tag-help',
  bgcolor: '#DEDEDE'
}, {
    id: 4,
    label: {
      ru: 'новичек',
      en: 'novice',
      ua: 'новачок'
    },
    icon: 'tag-skill',
    bgcolor: '#5EDE63'
  }, {
    id: 5,
    label: {
      ru: 'любитель',
      en: 'dilettante',
      ua: 'любитель'
    },
    icon: 'tag-skill',
    bgcolor: '#8FDE5E'
  }, {
    id: 6,
    label: {
      ru: 'практикант',
      en: 'trainee',
      ua: 'практикант'
    },
    icon: 'tag-skill',
    bgcolor: '#DED15E'
  }, {
    id: 7,
    label: {
      ru: 'опытный',
      en: 'skilled',
      ua: 'досвідчений'
    },
    icon: 'tag-skill',
    bgcolor: '#DE9C5E'
  }, {
    id: 8,
    label: {
      ru: 'профи',
      en: 'pro',
      ua: 'профі'
    },
    icon: 'tag-skill',
    bgcolor: '#DE755E'
  }, {
    id: 9,
    label: {
      ru: 'убер',
      en: 'uber',
      ua: 'убер'
    },
    icon: 'tag-skill',
    bgcolor: '#DE5E5E'
  }, {
    id: 10,
    label: {
      ru: 'время',
      en: 'time',
      ua: 'час'
    }
  }, {
    id: 18,
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
