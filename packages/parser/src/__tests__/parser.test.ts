import { Parser } from '../parser'

const Demo = `
export function extra1(){
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

describe('Parser GetLocals Test', () => {
  test('runs without crashing', () => {
    expect(() => {
      new Parser().parse(Demo)
    }).not.toThrow()
  })
})
