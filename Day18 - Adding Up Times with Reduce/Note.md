## **Day18 Note**

### `本日主要內容 --`

#### 1. 取出全體的時間值並轉換為秒數進行加總出總秒數

#### 2. 將總秒數轉換為時分秒格式後輸出結果

---

### `解析 --`

```js
// 以下兩種方式都可以將取取出的NodeList轉為Array
const timeNodes = [...document.querySelectorAll("[data-time]")];
// const timeNodes = Array.from(document.querySelectorAll("[data-time]"));

const seconds = timeNodes
  // 先取出陣列中每個dataset.time再運用split()每個時間用":"切分出來並轉換為數值, 因為要計算總秒數,所以將分數*60+秒數,最後再運用reduce將所有的秒數進行累加
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    const [mins, secs] = timeCode.split(":").map(parseFloat);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

// 宣告一個變數存放計算出的總秒數
let secondsLeft = seconds;

// 開始針對總秒數進行切分成時分秒
// 總秒數除以3600畫分成時數後放入hours中,接著要計算分數和秒數必須要用切割掉時數後剩下的時間去來做後續的運算,故在此使用餘數,取出總秒數/3600以後的剩下的時間做運算, 分數與時數計算方式相同, 而最後除完分數所得的餘數即是秒數, 如此便可取得時分秒數並進行輸出
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```

---

### **`補充 --`**

- parseFloat(string) & parseInt(string, radix)
  - parseFloat: 將字串轉換為浮點數
  - parseInt: 將字串轉換為 radix 進制的整數，radix 介於 2-36 之間
  - [MDN--Built-in Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

---

### _`新增 --`_

- 新增版面及新增將總秒數更新於頁面
- 新增秒數小於 10 輸出樣式
