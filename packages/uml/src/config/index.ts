import { IUmlUserConfig, IUmlDefaultConfig } from '@tuml/types'
import { deepMerge } from '../utils/'

class StyleConfig {
  config: IUmlDefaultConfig = {
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
      width: 400,
      height: 30,
      hGap: 600
    }
  }

  constructor(userConfig?: IUmlUserConfig) {
    if (userConfig) {
      this.config = deepMerge(this.config, userConfig)
    }
  }

  getConfig(): IUmlDefaultConfig {
    return this.config
  }
}

export { StyleConfig }
