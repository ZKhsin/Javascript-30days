## **Day27 Note**

### `本日主要內容 --`

#### 1. 監聽滑鼠事件

#### 2. 實現卷軸水平移動功能

---

### `解析 --`

```js
// 選取出欲製作卷軸使用的監聽元素
const slider = document.querySelector(".items");
let isDown = false; // 用於記錄滑鼠是否按著
let startX; // 用於紀錄mousedown時的初始X座標, 可用之計算滑鼠移動多少距離
let scrollLeft; // 用於紀錄mousedown時的卷軸X座標

// 接著監聽滑鼠的動作進入操作產生不同的功能
slider.addEventListener("mousedown", (e) => {
  // 首先是監聽滑鼠按下時的事件, 將用來紀錄滑鼠按下狀態的變數設定為true, 並為元素加入active屬性
  isDown = true;
  slider.classList.add("active");
  // 運用e.pageX取得點擊位置到網頁最左側邊緣的距離, 並減掉該位置到卷軸最左側的距離, 此數值為初始的X座標
  startX = e.pageX - slider.offsetLeft;
  // 將初始X座標存入卷軸X座標中
  scrollLeft = slider.scrollLeft;
});

// 監聽滑鼠移開時事件, 將記錄滑鼠按下狀態恢復為flase,並移除添加的active屬性
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

// 監聽滑鼠放開事件, 將記錄滑鼠按下狀態恢復為flase,並移除添加的active屬性
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});

// 監聽滑鼠移動事件, 只有在記錄滑鼠按下狀態為ture時才會接續進行
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  // 宣告一變數存入滑鼠移動位置到網頁最左側邊緣的距離, 並減掉該位置到卷軸最左側距離的數值
  const x = e.pageX - slider.offsetLeft;
  // 移動距離為目前移動頁面的數值 - 初始位值的數值, 乘以3主要是讓移動距離加大可以讓卷軸移動較快, 亦可不使用
  const walk = (x - startX) * 3;
  // 設定水平卷軸的偏移量, 卷軸最左側的距離減掉移動距離
  slider.scrollLeft = scrollLeft - walk;
});
```

---

### **`補充 --`**

- MouseEvent.page
  - pageX: 返回相對於整個文檔的水平座標
  - pageY: 返回相對於整個文檔的垂直座標
