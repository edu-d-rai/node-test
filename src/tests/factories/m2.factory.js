import { M2 } from 'data/models';

const buildM2 = async (m2Fks) => {
  let resM2 = {};
  


  if (m2Fks.m1s!==null || typeof m2Fks.m1s!=="undefined") {
    resM2.m1s = m2Fks.m1s;
  }
  
  return resM2;
};

const createM2 = async (fakeM2) => {
  const m2 = await M2.create(fakeM2);
  return m2;
};

export { buildM2, createM2 };

