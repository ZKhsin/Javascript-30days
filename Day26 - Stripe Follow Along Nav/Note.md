## **Day26 Note**

### `本日主要內容 --`

#### 1. 建立滑鼠移入效果

#### 2. 建立滑鼠移出效果

---

### `解析 --`

```js
// 選取出會需要使用到的頁面元素
const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

// 滑鼠移入功能
function handleEnter() {
  // 替觸發事件增加trigger-enter
  this.classList.add("trigger-enter");
  // 當觸發事件包含trigger-enter時在150毫秒後加入trigger-enter-active
  setTimeout(
    () =>
      this.classList.contains("trigger-enter") &&
      this.classList.add("trigger-enter-active"),
    150
  );
  // 將頁面設定為下拉選單背景的區域加入open
  background.classList.add("open");

  // 取得觸發事件內的ul並取得該定位與大小資訊
  const dropdown = this.querySelector(".dropdown");
  const dropdownCoords = dropdown.getBoundingClientRect();
  // 取得nav的定位與大小資訊
  const navCoords = nav.getBoundingClientRect();

  // 宣告一物件放入觸發事件內ul的高寬及位置(ul到nav頂點及左邊距離)
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  // 設定下拉選單背景的寬高及位置
  background.style.setProperty("width", `${coords.width}px`);
  background.style.setProperty("height", `${coords.height}px`);
  background.style.setProperty(
    "transform",
    `translate(${coords.left}px, ${coords.top}px)`
  );
}

// 滑鼠移出功能
function handleLeave() {
  // 滑鼠移出時將移入時觸發事件及背景添加的屬性移除
  this.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
}

// 監聽頁面選單滑鼠移入及移出事件並進入功能
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseleave", handleLeave)
);
```

---

### **`補充 --`**

- style.setProperty(propertyName, value, priority)
  - 為對象增加 CSS 屬性
- DOMTokenList.contains(token)
  - 判斷參數 token 是否存在對象內，如存在返回 ture，否則返回 false
