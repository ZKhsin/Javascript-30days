## **Day30 Note**

### `本日主要內容 --`

#### 1. 隨機選擇地鼠出現位置及出現後存在時間

#### 2. 監聽打地鼠動作並計時計分

---

### `解析 --`

```js
// 取得頁面需要的元素並設定預設變數
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole; // 最後一次出現的地鼠位置
let timeUp = false; // 判斷遊戲是否結束
let score = 0; // 計分

// 隨機回傳地鼠出現後的存在時間
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// 隨機回傳地鼠出現的位置
function randomHole(holes) {
  // 設定一變數存放隨機取得地鼠位置
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // 如果最後一次出現的地鼠位置和這次出現的地鼠位置一樣則重新進入直到出現不一樣位置
  if (hole === lastHole) {
    return randomHole(holes);
  }
  // 將這次出現的位置存放入最後一次出現地鼠的位置更新,並回傳地鼠洞位置
  lastHole = hole;
  return hole;
}

// 設定地鼠出現狀態
function peep() {
  // 將時間區間傳入randomTime並取得地鼠出現時間
  const time = randomTime(200, 1000);
  // 取得地鼠位置
  const hole = randomHole(holes);
  // 為地鼠添加出現的動畫並於出現時間結束時移出動畫, 並且如果遊戲時間尚未結束就繼續執行讓地鼠出現
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

// 開始遊戲
function startGame() {
  // 每次開始遊戲分數及顯示分數歸零
  scoreBoard.textContent = 0;
  score = 0;
  // 時間重置
  timeUp = false;
  // 進入地鼠出現function
  peep();
  // 設定遊戲時間為10秒鐘, 10秒後遊戲結束
  setTimeout(() => (timeUp = true), 10000);
}

// 設定得分狀態
function bonk(e) {
  // 判斷事件是否由使用者操作產生,如否則跳出此函式, 如是分數+1
  if (!e.isTrusted) return;
  score++;
  // 設定打到地鼠後立即移除地鼠出現動畫
  this.parentNode.classList.remove("up");
  // 更新顯示分數
  scoreBoard.textContent = score;
}

// 監聽每個地鼠被滑鼠點擊時進入bonk
moles.forEach((mole) => mole.addEventListener("click", bonk));
```

---

### **`補充 --`**

- Event.isTrusted
  - 如事件是由使用者操作而產生，則返回 true，若事件由程式碼所建立、修改或透過 EventTarget.dispatchEvent()來觸發，返回 false
