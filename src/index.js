
/**
 * @Author Ken
 * @CreateDate 2019-08-01 11:43
 * @LastUpdateDate 2019-08-01 11:43
 * @desc localStorage 的读写操作, 支持版本更新与过期
 * @params
 * @return
 */

const MAX_LIFE = 1000 * 3600 * 24 * 365 * 10; // 10 years

const Index = {
  ver: 1,
  prefix: 'store_',
  set(key, value, option = {}) {
    const newOption = Object.assign({ life: MAX_LIFE, postponable: false }, option);
    newOption.expireOn = Date.now() + newOption.life;
    const obj = { ver: this.ver, option: newOption, value };
    localStorage.setItem(this.prefix + key, JSON.stringify(obj));
  },
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

    if (ver !== this.ver) {
      return this.transition(ver, key, value, option);
    }

    return value;
  },
  remove(key) {
    localStorage.removeItem(this.prefix + key);
  },
  clear() {
    localStorage.clear();
  },
  transition(ver, key, value, option) {
    // Ken 2019-08-01 12:26 如果出现版本不匹配的问题, 很可能需要进行数据格式的升级, 或者丢弃, 逻辑可以在这里写
    // 在数据格式变化比较大的时候, 可以清空数据, 再强制刷新

    // 示例:
    // if (ver === 1 && key === 'name') {
    //   this.set(key, `${value}_upgraded`, option);
    //
    //   return `${value}_upgraded`;
    // }

    return value;
  },
};

export default Index;
