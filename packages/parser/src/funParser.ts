export const funAnalyze = f => {
  const fName = f.getName()
  const fparams = []
  const funParams = f.getParameters()
  funParams.forEach(p => {
    const funParams = p.getName()
    fparams.push(funParams)
  })
  console.log(`methods & params-> ${fName}:${fparams}`)
}
