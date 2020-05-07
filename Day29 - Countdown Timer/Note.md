## **Day29 Note**

### `本日主要內容 --`

#### 1. 取得元素並設定計時器

#### 2. 設定固定時間倒數按鈕

#### 3. 設定自訂時間倒數按鈕

---

### `解析 --`

```js
// 宣告一個變數存放計時器並選取出頁面需要的元素
let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

// 計時器功能
function timer(seconds) {
  // 每次進入都先清空計時器, 避免連續點擊按鈕時造成多個計時器同時進行
  clearInterval(countdown);
  // 取得現在時間(返回為毫秒)
  const now = Date.now();
  // 取得結束時間(計算出毫秒)
  const then = now + seconds * 1000;
  // 將現在時間及倒數結束時間放入各自的function處理
  displayTimeLeft(seconds);
  displayEndTime(then);

  // 執行倒數計時功能
  countdown = setInterval(() => {
    // 取得需要倒數的總時長
    const secondLeft = Math.round((then - Date.now()) / 1000);
    // 如果總時長小於零則執行清空計時器
    if (secondLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // 將總時長帶入顯示倒數時間的function
    displayTimeLeft(secondLeft);
  }, 1000);
}

// 顯示倒數時間
function displayTimeLeft(seconds) {
  // 運用Mathi.floor取得分鐘數
  const minutes = Math.floor(seconds / 60);
  // 取得秒數(取得除以分數後的餘數)
  const remainderSeconds = seconds % 60;
  // 設定倒數時間(如果秒數小於10前面補零)
  const display = `${minutes}: ${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;

  // 放入顯示倒數時間
  document.title = display;
  timerDisplay.textContent = display;
}

// 顯示結束時間
function displayEndTime(timestamp) {
  // 取得結束時間
  const end = new Date(timestamp);
  // 取得結束時間的時數
  const hour = end.getHours();
  // 將時數改為12時制
  const adjustHour = hour > 12 ? hour - 12 : hour;
  // 取得結束時間的分數
  const minutes = end.getMinutes();

  // 設定結束時間並顯示於頁面(分數如小於10前面補零)
  endTime.textContent = `Be Back At ${adjustHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

// 啟動計時器
function startTimer() {
  // 取得存在頁面中設定的秒數並傳入計時器功能
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// 監聽所有頁面上的按鈕被點擊時進入startTimer
buttons.forEach((button) => button.addEventListener("click", startTimer));

// 監聽自訂倒數時間欄提交時觸發事件
document.customForm.addEventListener("submit", function (e) {
  // 提交會刷新頁面,故設定暫停預設刷新
  e.preventDefault();
  // 取得輸入欄位的分數並換算為秒數放入計時器功能
  const mins = this.minutes.value;
  timer(mins * 60);
  // 完成以上後清空輸入欄內容
  this.reset();
});
```

---

### **`補充 --`**

- Date

  - Date.now(): 回傳自 1970/01/01 起經過的毫秒數
  - 參數: value, dateString, year, month, day, hour, minute, second, millisecond

- setInterval() & clearInterval
  - setInterval(): 間隔固定的時間不斷重複
  - clearInterval(): 取消 setInterval()
