const add = (a: number, b: number) => {
  /* The return value is used to determine
   * the return type of the function */
  return a + b;
};

type Callsfunction = (callback: (result: string) => any) => void;

const func: CallsFunction = (cb) => {
  cb("done");
  cb(1);
};

func((result) => {
  return result;
});
