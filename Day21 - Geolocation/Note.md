## **Day21 Note**

### `本日主要內容 --`

#### 1. 運用 geolocation 取得使用者地理位置、海拔及速度

#### 2. 將取得的速度及方位資訊顯示於頁面上

---

### `解析 --`

```js
const arrow = document.querySelector(".arrow"); // 選取出指南針
const speed = document.querySelector(".speed-value"); // 選取出放置速度值位置

// 運用geolocation的watchPosition來取得使用者資訊, 成功取出會回傳一組Position, 即可使用Posision內的資料進行添加至頁面輸出,如未能成功取出則回傳錯誤訊息
navigator.geolocation.watchPosition(
  (data) => {
    speed.textContent = Math.round(data.coords.speed);
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  },
  (err) => {
    console.err(err);
    alert("Hey!You gotta allow that to happen!");
  }
);
```

---

### **`補充 --`**

- Geolocation
  - 運用於獲取裝置位置
    - getCurrentPosition(): 取得裝置當前位置
    - WatchPosition(): 回傳裝置位置，當裝置位置更新時會自動被呼叫再回傳
  - [MDN--Gelocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)

---

### **`新增 --`**

- 新增顯示座標
