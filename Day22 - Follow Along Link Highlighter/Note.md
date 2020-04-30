## **Day22 Note**

### `本日主要內容 --`

#### 1. 運用 getBoundingClientRect()取得元素相對於瀏覽器的相對位置

#### 2. 利用 translate 來設置 highlight 出現的位置

---

### `解析 --`

```js
const triggers = document.querySelectorAll("a"); // 選取出頁面所有需要做效果的a元素
// 創建出一個span放入設置好highlight狀態的class, 並將span加入在body裡
const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.append(highlight);

function highlightLink() {
  // 取得進入事件的位置資訊
  const linkCoords = this.getBoundingClientRect();

  // 建立一個物件存放進入事件的寬高及座標, 特別注意位置資訊需要加入頁面滾動的高度, 以避免當頁面滾動時hightlight的位置會跑掉(top&left是相對於body的距離)
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX,
  };

  // 將span加入事件的寬高及座標, 讓滑鼠移動到事件位置時會產生highlight效果
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px,${coords.top}px)`;
}

// 監聽所有滑鼠移入a的事件並觸發進入highlightLink
triggers.forEach((a) => a.addEventListener("mouseenter", highlightLink));
```

---

### **`補充 --`**

- getBoundingClientRect()
  - 返回目標元素的寬高級相對視窗的位置資訊
  - 回傳值: left、top、right、bottom、x、y、width、height
