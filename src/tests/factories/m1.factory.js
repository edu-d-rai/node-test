import { M1 } from 'data/models';

const buildM1 = async (m1Fks) => {
  let resM1 = {};
  


  if (m1Fks.m2s!==null || typeof m1Fks.m2s!=="undefined") {
    resM1.m2s = m1Fks.m2s;
  }
  
  return resM1;
};

const createM1 = async (fakeM1) => {
  const m1 = await M1.create(fakeM1);
  return m1;
};

export { buildM1, createM1 };

