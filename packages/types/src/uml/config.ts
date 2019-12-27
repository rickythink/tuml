export interface IUmlUserConfig {
  lineStyle?: {
    color?: string
    arrowSize?: number
  }
  blockStyle?: {
    header?: {
      color?: string
      backgroundColor?: string
      height?: number
    }
    content?: {
      color?: string
      backgroundColor?: string
      padding?: number
      height?: number
    }
    border?: {
      width?: number
      color?: string
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
      height: number
    }
    content: {
      color: string
      backgroundColor: string
      padding: number
      height: number
    }
    border: {
      width: number
      color: string
    }
    width: number
    height: number
    hGap: number
  }
}
