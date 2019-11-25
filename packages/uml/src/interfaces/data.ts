interface IDeps {
  key: string;
  name: string;
}

interface IBlockData {
  name: string;
  values: {
    [propName: string]: string;
  };
  deps?: {
    [propName: string]: Array<IDeps>;
  };
}

export type TData = Array<IBlockData>
