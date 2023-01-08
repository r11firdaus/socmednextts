const groupBy = (arr: [], key: string): void => {
  return arr.reduce((r, a) => {
    r[a[key]] = r[a[key]] || [];
    r[a[key]].push(a);
    return r;
  }, Object.create(null))
}

export default groupBy