export const classAnalyze = c => {
  // 1.get classname
  const className = c.getName()
  console.log(`classname->${className}`)

  // 2.get all the methods
  const methods = c.getInstanceMethods()
  methods.forEach(m => {
    // get method name
    const methodName = m.getName()
    // get params of method
    const mparams = []
    const methodParams = m.getParameters()
    methodParams.forEach(p => {
      const methodParam = p.getName()
      mparams.push(methodParam)
    })
    console.log(`method&params -> ${methodName}:${mparams}`)
  })

  // 3.get instance property
  const intanceProperties = c.getInstanceProperties()
  intanceProperties.forEach(p => {
    const property = p.getName()
    const type = p.getType().getText()
    console.log(`instance property -> ${property}:${type}`)
  })

  // 4.get static property
  const staticProperties = c.getStaticProperties()
  staticProperties.forEach(p => {
    const property = p.getName()
    const type = p.getType().getText()
    console.log(`static property -> ${property}:${type}`)
  })

  // 5. get base class
  const baseClass = c.getBaseClass()
  if (baseClass) {
    const baseClassName = baseClass.getName()
    console.log(`base class -> ${baseClassName}`)
  }
}
