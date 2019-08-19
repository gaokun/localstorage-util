interface Config {
  ver?: number;
  prefix?: string;
  transition?: Function;
}

interface PersistenceOption {
  life?: number; // 单位: ms
  postponable?: boolean; // 是否可延期, true: 每次get都会刷新过期时间
  expireOn?: number; // 失效时间
  lastAccessTime?: number; // 上次访问时间
}

type Value = number | string | object;

declare class LocalStorageUtil {
  constructor(config: Config)

  get(key: string): Value

  set(key: string, value: Value, option: PersistenceOption): void

  remove(key: string): void

  clear(): void
}
