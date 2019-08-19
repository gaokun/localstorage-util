interface Config {
  ver?: number;
  prefix?: string;
  transition?: Function;
}

interface Option {
  life?: number;
  postponable?: boolean;
}

type Value = number | string | object;

declare class LocalStorageUtil {
  constructor(config: Config)

  get(key: string): Value

  set(key: string, value: Value, option: Option): void

  remove(key: string): void

  clear(): void
}
