import { IUserConfig, IDefaultConfig } from '../interfaces/config'
import { deepMerge } from '../utils/'

class StyleConfig {
  config:IDefaultConfig = {
    lineStyle: {
      color: '#333',
      arrowSize: 5
    },

    blockStyle: {
      header: {
        color: '#333',
        backgroundColor: 'lightgray',
        height: 30
      },
      content: {
        color: '#333',
        backgroundColor: 'lightgray',
        padding: 10,
        height: 30
      },
      border: {
        width: 4,
        color: 'lightblue'
      },
      width: 200,
      height: 30,
      hGap: 300
    }
  }

  constructor (userConfig ?: IUserConfig) {
    if (userConfig) {
      this.config = deepMerge(this.config, userConfig)
    }
  }

  getConfig () :IDefaultConfig {
    return this.config
  }
}

export {
  StyleConfig
}
