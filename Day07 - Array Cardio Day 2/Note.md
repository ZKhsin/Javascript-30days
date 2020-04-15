## **Day4 Note**


---
### `本日主要內容 --`
#### 1. 練習Array的各種操作(共5題)
---


### `解析 --`


### ***Array.prototype.some()***

1.找尋peple中是否有人大於19歲

```js

  const isAdult = people.some(person => ((new Date())getFullYear()) - person.year >= 19); // some()會將people中的資料逐個進行判斷, 只要有一個資料大於19歲便會返回true 

  console.log(isAdult);

```

---

### ***Array.prototype.every()***

2.找尋people中是否所有人都大於19歲

```js

  const allAdult = people.every(person => ((new Date()).  getFullYear()) - person.year >= 19); // every()會將people中的資料逐個進行判斷, 因people中並不是所有人都大於19歲, 故返回false

  console.log(allAdult);

```

---

### ***Array.prototype.find()***

3.在comments中找到id=823423的資料

```js

  const comment = comments.find(comment => comment.id === 823423);  // find()會將comments中的資料逐個進行判斷,並返回符合id=823423的值

  console.log(comment);

```


---


### ***Array.prototype.findIndex()***

4.在comments中找到id=823423的資料索引值

```js

  const index = comments.findIndex(comment => comment.id === 823423); // findIndex()會將comments中的資料逐個進行判斷,並返回符合條件的索引值

  console.log(index); 

```

---

### ***Array.prototype.splice()***

5.將comments中id=823423的資料透過索引值刪除

```js

  const newComments = [
    ...comments.slice(0, index), // 從0到index前的資料
    ...comments.slice(index + 1) // 從index下一個資料到最後
  ];  // 運用上提找出之索引值利用spared(...)來進行展開陣列,並透過slice()組合新陣列

```

---

### **`補充 --`**
* some()
  * 透過給定函式，測試陣列中是否至少有一個元素符合函式所實作的測試，符合則回傳true，否則回傳false
  * [MDN--some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)


* every()
  * 透過給定函式，測試陣列中是否所有元素都符合函式所實作的測試，符合則回傳true，否則回傳false
  * [MDN--every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

* find() 
  * 回傳第一個符合函式要求的元素值，如都不符合則回傳undefined
  * [MDN--find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)


* findIndex() 
  * 回傳第一個符合函示要求的元素之索引值，如都不符合則回傳-1
  * [MDN-findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)


* slice(*begin, *end)
  * 此方法會回傳一個新陣列，新陣列內部為原陣列選擇的begin到end部分的淺拷貝，原本的鎮些不會受影響
  * 兩參數可選擇填入，默認為拷貝整個陣列，亦可使用負數索引
  * [MDN--slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)


* Spared Syntax(...)
  * 展開語法允許在創建陣列時，將一個陣列或字串在語法層面展開其內容成為個別數值，還可以在創建物件時，將來元物件按照key-value的方式展開，或在呼叫函式時對傳入參數、接收參數進行展開的速寫語法
  * [MDN--Spared Syntax](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_syntax)