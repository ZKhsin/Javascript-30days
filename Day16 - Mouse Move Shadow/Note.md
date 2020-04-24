## **Day16 Note**

<div align=center><img src="mouse_move_shadow.png" width=800></div>

---

### `本日主要內容 --`

#### 1. 讓文字的陰影隨滑鼠移動的位置偏移

---

### `解析 --`

```js
const hero = document.querySelector(".hero"); // 選取目標區域div
const text = hero.querySelector("h1"); // 選取div中的h1
const walk = 100; // 設定偏移基準

function shadow(e) {
  // 這邊使用的是Destructuring Assignment, 等同於以下
  const { offsetWidth: width, offsetHeight: height } = hero;
  // const width = hero.offsetWidth
  // const height = hero.offsetHeight

  let { offsetX: x, offsetY: y } = e;
  // let x = e.offsetX
  // let y = e.offsetY

  // 假如滑鼠漂移的位置不在目標區域內, 則需加上目標區域到父曾的頂端與左側的距離作為滑鼠實際飄移位置
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  // 運用(滑鼠所在的座標 / div的寬高度 * 偏移基準)來計算移動的距離, 而後面減掉偏移值的一半,是為了讓移動的距離以div的中心點去做變化
  const xWalk = Math.round((x / width) * walk - walk / 2);
  const yWalk = Math.round((y / height) * walk - walk / 2);

  // 再來就可以把計算出的移動距離利用textShadow呈現出多重陰影的畫面
  text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(0, 255, 255, 0.7),
        ${yWalk}px ${xWalk * -1}px 0 rgba(0, 255, 0, 0.7),
        ${yWalk * -1}px ${xWalk}px 0 rgba(0, 0, 255, 0.7)
      `;
}

hero.addEventListener("mousemove", shadow); // 監聽滑鼠移動時進入shadow
```

---

### **`補充 --`**

- Math

  - 擁有數學常數和數學函數屬性及方法的內建物件
  - 常用方法
    1. abd(x): 回傳 x 絕對值
    2. floor(x): 回傳不大於 x 的最大正整數
    3. ceil(x): 回傳不小於 x 的最小正整數
    4. max([x[, y[, …]]])): 回傳給定數值中的最大值
    5. min([x[, y[, …]]])): 回傳給定數值中的最小值
    6. pow(x, y): 回傳 x 的 y 次方
    7. random(): 回傳 1 到 0 之間的隨機值
    8. round(x): 回傳 x 的四捨五入值
    9. sqrt(x): 回傳 x 的平方根
  - [MDN--Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

- Destructuring Assignment
  - 解構賦值可以把陣列或物件中的資料解開擷取成為獨立變數
  - 注意: 陣列的解構賦值強調順序，而物件的強調屬性名稱，屬性名稱必須相互對應才能取值
  - 常見使用情況:
    1. 從陣列中解構賦值
    2. 從物件中解構賦值
    3. 非物件或非陣列的解構賦值
    4. 解構賦值時給定預設值
    5. 搭配函式的傳入參數使用
  - [MDN--Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
