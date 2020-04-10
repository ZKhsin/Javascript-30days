## **Day2 Note**


<div align=center><img src="js_css_clock.png" width=800></div>

---
### `本日主要內容 --`
#### 1. 運用.hand呈現時分秒針
#### 2. 設定定時器取得當前時間及對應角度
---


### `解析 --`


```js
    const secondsHand = document.querySelector('.second-hand');  // 選取秒針
    const minsHand = document.querySelector('.min-hand');  // 選取分針
    const hoursHand = document.querySelector('.hour-hand');  // 選取時針

    function setDate() {
      // 此函式用於計算各指針應該有的角度
      const now = new Date();  // 取得時間的函數, 用於抓取當前時間


      // 取得對應角度部分都加90是因為預設指針在9時,須將其移動到12時
      const seconds = now.getSeconds(); // 取得當前秒
      const secondsDegrees = ((seconds / 60) * 360) + 90; // 計算當前秒的對應角度
      secondsHand.style.transform = `rotate(${secondsDegrees}deg)`; // 運用計算出秒的對應角度修改transform的角度

      const mins = now.getMinutes(); // 取得當前分
      const minsDegrees = ((mins / 60) * 360) + 90; // 計算當前分的對應角度
      minsHand.style.transform = `rotate(${minsDegrees}deg)`; // 運用計算出分的對應角度修改transform的角度  

      const hours = now.getHours();  // 取得當前時
      const hoursDegrees = ((hours / 12) * 360) + 90;  // 計算當前時的對應角度
      hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;  // 運用計算出時的對應角度修改transform的角度
    }

    setInterval(setDate, 1000); //每秒取得當前時間來執行時鐘的設置

```

---

### **`補充 --`**
* let & const
  * let: 變數宣告，在for迴圈中每次循環都會重新綁定
  * const: 常數宣告，不可再重覆指定，物件、陣列、函式等參照類型使用
  * let & const 皆為區塊作用域，var 為函式作用域(全域)

* setInterval(callback, time)
  * 固定間隔某段時間後執行對應程式碼，並不斷循環，作為定時器使用
  * 如想停下來，可使用clearInterval()來執行取消
  * 與setTimeout()不同地方在於setTimeout()只會執行一次(取消則使用clearTimeout()，但只在執行完成前使用有效果)

* Date()
  * JS的內建物件，用於指向某一時間點，特別注意使用時必須加new(若無加回傳值只會是一個字串而不是Date物件)
  * 參數及方法看[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

* 多元運用的transform
  * rotate(): 旋轉物件(角度+deg)
  * oragin: 可變形軸心(預設為物件中心點)，可調整百分比
  * 更多transform用法看[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)