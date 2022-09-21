//
const t1: number = 123;
const t2: string = 'qwe';

const f1 = () => {
  return 0;
};

function f2() {
  return 0;
}

interface ISomeObj {
  a: number;
  b: string;
}

const t3 = {
  a: 1,
  b: '2',
};

interface ISomeObj2 extends ISomeObj {
  c: boolean;
}

const t31: ISomeObj2 = {
  a: 2,
  b: '3',
  c: true,
};

const t32 = t3 as ISomeObj2;
console.log(t32);

//
export {};
