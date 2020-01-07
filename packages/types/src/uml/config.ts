export interface IUmlUserConfig {
  lineStyle?: {
    color?: string
    arrowSize?: number
  }
  blockStyle?: {
    header?: {
      color?: string
      backgroundColor?: string
      padding?: number
      height?: number
      fontSize?: number
    }
    content?: {
      color?: string
      backgroundColor?: string
      padding?: number
      height?: number
      fontSize?: number
    }
    border?: {
      width?: number
      color?: string
    }
    icon?: {
      size?: number
    }
    radios?: number
    width?: number
    height?: number
    hGap?: number
    vGap?: number
  }
}

export interface IUmlDefaultConfig {
  lineStyle: {
    color: string
    arrowSize: number
  }
  blockStyle: {
    header: {
      color: string
      backgroundColor: string
      padding: number
      height: number
      fontSize: number
    }
    content: {
      color: string
      backgroundColor: string
      padding: number
      height: number
      fontSize: number
    }
    border: {
      width: number
      color: string
    }
    icon: {
      size: number
    }
    width: number
    height: number
    hGap: number
  }
}
