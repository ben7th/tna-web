const moment = require('moment')

const defaultSorters = {
  Blog: (a, b) => { return b.date - a.date },
  Runner: (a, b) => { return b.updated - a.updated },
  Activity: (a, b) => { return moment(b.start_time) - moment(a.start_time) }
}

const defaultFilters = {
  Runner: (x) => { return x.show !== false }
}

class Model {
  constructor (site) {
    this.site = site
  }

  all (className) {
    let _filter = defaultFilters[className] || function () { return true }
    let _sorter = defaultSorters[className] || function () {}

    let result = this.site.posts
      .filter(x => x.class === className)
      .filter(_filter)
      
    result.data = result.data
      .sort(_sorter)

    return result
  }

  one (className, filter) {
    return this.all(className)
      .filter(filter)
      .first()
  }
}

hexo.extend.helper.register('Model', (site) => {
  return new Model(site)
})