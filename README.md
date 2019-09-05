# localstorage-util

## CN
localStorage 的读写操作, 支持版本更新与过期

get操作返回数据类型与set时的数据类型一致

## EN
localStorage util, support version upgrade & data expire

get will get the data exactly what set saved

## How to use 

webpack:
```javascript
import LocalStorageUtil from 'localstorage-util';

const LS = new LocalStorageUtil({ prefix: 'my_project_' });

LS.set('user', { name: 'Ken' });

const user = LS.get('user');

```

Browser:
```html
<script src="https://unpkg.com/localstorage-util"></script>

```
```javascript
const LS = new LocalStorageUtil({ prefix: 'my_project_' });

LS.set('user', { name: 'Ken' });

const user = LS.get('user');
```
## Contact
 Feel free to contact me if you have any questions.
 
 Email: kytogether@vip.qq.com
