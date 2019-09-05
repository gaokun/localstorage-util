/**
 * @Author Ken
 * @CreateDate 2019-08-01 11:43
 * @LastUpdateDate 2019-09-05 20:14
 * @desc localStorage 的读写操作, 支持版本更新与过期
 * @params
 * @return
 */
class LocalStorageUtil {
  constructor(config = {}) {
    this.MAX_LIFE = 1000 * 3600 * 24 * 365 * 10; // 10 years
    this.ver = config.ver || 1;
    this.prefix = config.prefix || 'store_';
    this.transition = config.transition;
  }

  set(key, value, option = {}) {
    const newOption = Object.assign({ life: this.MAX_LIFE, postponable: false }, option);
    newOption.expireOn = Date.now() + newOption.life;
    const obj = { ver: this.ver, option: newOption, value };
    localStorage.setItem(this.prefix + key, JSON.stringify(obj));
  }

  get(key) {
    const strValue = localStorage.getItem(this.prefix + key);
    if (!strValue) {
      return null;
    }
    const { ver, option, value } = JSON.parse(strValue);
    const currentTime = Date.now();
    if (currentTime >= option.expireOn) {
      this.remove(key);
      return null;
    }

    option.lastAccessTime = currentTime;
    if (option.postponable) option.expireOn = currentTime + option.life;

    this.set(key, value, option);

    if (ver !== this.ver && this.transition) {
      return this.transition(ver, key, value, option);
    }

    return value;
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  /**
   * @comment 只清理本实例创建的, 避免误伤. 若要全部清理, 可直接使用localStorage.clear方法
   * */
  clear() {
    for (const key of localStorage) {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}
