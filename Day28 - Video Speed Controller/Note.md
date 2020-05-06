## **Day28 Note**

### `本日主要內容 --`

#### 1. 設定影片速度條，可用滑鼠移動控制影片速度

---

### `解析 --`

```js
// 首先取出需要使用的元素
const speed = document.querySelector(".speed");
const bar = speed.querySelector(".speed-bar");
const video = document.querySelector(".flex");

// 針對滑鼠移動撰寫功能
function handleMove(e) {
  // 用滑鼠在頁面頂端的垂直軸定位減掉進度條到頁面頂端的定位來建立觸發點位置
  const y = e.pageY - this.offsetTop;
  // 將觸發點的位置除上速度調條的總高度取得觸發點在速度調的位置百分比
  const percent = y / this.offsetHeight;
  // 設定速率最大為4,且每0.4一個單位
  const min = 0.4;
  const max = 4;
  // 計算出位置的百分比值
  const height = Math.round(percent * 100) + "%";
  // 取得位置所在的對應速度
  const playbackRate = percent * (max - min) + min;

  // 將速度條的位置設定為觸發點位置計算出的百分比值,並將速度條顯示的值放入觸發點位置對應的速度
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + "x";
  // 設定影片的速度等同於觸發點對應的速度
  video.playbackRate = playbackRate;
}

// 監聽滑鼠在速度條上移動的事件並進入handleMove
speed.addEventListener("mousemove", handleMove);
```

---

### **`補充 --`**

- HTMLMediaElement.playbackRate
  - 設置媒體播放時的速度，可實現不同倍速效果，亦可設為負值實現倒放影片
