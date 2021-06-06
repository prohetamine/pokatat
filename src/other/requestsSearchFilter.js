export default (requests, search, activeTags) => {
  const keywords = search
                    .replace(/(\[|[^А-Яа-яЁёA-za-z@#$\d,-_])/gi, '')
                    .split(',')
                    .map(keyword => keyword.trim())

  return requests
    .filter(
      ({ isLoad, tags, description, city, usercount, reqname }) =>
        isLoad
          ? true
          : keywords[0].length === 0 &&
            activeTags.length === 0
              ? true
              : keywords.filter(keyword =>
                  keyword.length > 0
                    ? !!((_keyword) =>
                          reqname.match(_keyword)                    ||
                          usercount.toString().match(_keyword)       ||
                          city.match(_keyword)                       ||
                          description.match(_keyword)                ||
                          tags.filter(
                            ({ value, label }) =>
                              value
                                ? value.toString().match(_keyword)
                                : label
                                    ? label.match(_keyword)
                                    : false
                          ).length > 0
                        )(
                          new RegExp(keyword, 'i')
                        )
                    : false
                ).length > 0 ||
                tags.filter(({ id }) =>
                  activeTags.length > 0
                    ? activeTags.find(_id => _id === id)
                    : false
                ).length > 0
    )
}
