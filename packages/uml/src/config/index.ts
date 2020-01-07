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
        color: 'white',
        backgroundColor: '#5091F1',
        padding: 18,
        height: 46,
        fontSize: 16
      },
      content: {
        color: '#333',
        backgroundColor: 'white',
        padding: 16,
        height: 30,
        fontSize: 14
      },
      border: {
        width: 1,
        color: 'lightblue'
      },
      icon: {
        size: 14
      },
      width: 400,
      height: 40,
      hGap: 100,
      backgroundColor: '#f4f4f4'
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
