const storage = {
  get: (key: string): string => {
  const item = window.localStorage.getItem(key);
  
  return item ? JSON.parse(item) : null;
  },
  set: (key: string, value: unknown): void => window.localStorage.setItem(key, JSON.stringify(value))
}

export default storage;