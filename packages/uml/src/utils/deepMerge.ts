import { IUserConfig, IDefaultConfig } from '../interfaces/config'

function isObject(item: object): boolean {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function deepMerge<T extends IDefaultConfig, U extends IUserConfig>(
  target: T,
  ...sources: U[]
): T {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && source && isObject(source)) {
    for (const key in source) {
      if (isObject(Reflect.get(source, key))) {
        if (!Reflect.get(target, key)) Object.assign(target, { [key]: {} })
        deepMerge(Reflect.get(target, key), Reflect.get(source, key))
      } else {
        Object.assign(target, { [key]: Reflect.get(source, key) })
      }
    }
  }

  return deepMerge(target, ...sources)
}
