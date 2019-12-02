import { Project } from 'ts-morph'
import tparser from '../index'

const Demo = `
function extra1(){
  console.log('extra')
}
function extra2(name1:string,name2:string){
  console.log(name1,name2)
}
class DemoBase {
  private base:string;
  constructor (name:string) {
    this.base = name
  }
}
class Demo extends DemoBase{
  static active: boolean = false;
  private secret: string|number;
  private base:DemoBase;

  constructor() {
    super('demo')
    this.secret = "cool";
  }

  public print() {
    console.log(this.secret);
  }

  public greet(name:string) {
    console.log(name)
  }
}

export default Demo;`

describe('classParser Test', () => {
  test('runs without crashing', () => {
    expect(() => {
      const project = new Project()
      const sourceFile = project.createSourceFile('Demo.ts', Demo)
      const classes = sourceFile.getClasses()

      classes.forEach(f => {
        tparser.classAnalyze(f)
      })
    }).not.toThrow()
  })
})
