## **Day13 Note**

### `本日主要內容 --`

#### 1. 建立當滾動頁面到一定位置時會產生動畫滑入圖片的特效

---

### `解析 --`

```js
function debounce(func, wait = 20, immediate = true) {
  // 每次觸發事件時會重置一個計時器, 再設置一個新的計時器,讓事件保持再每20毫秒回傳一次
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }; // 如果不立即執行, 等wait秒數後再執行
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }; // 秒數達到立即執行後再隔wait秒數
}

const sliderImages = document.querySelectorAll(".slide-in"); // 選取所有.clide-in的圖片元素

function checkSlide(e) {
  sliderImages.forEach((sliderImage) => {
    // 捕捉圖片一半高度的點位(卷軸的垂直位移量 + 螢幕視窗高度 - 圖片一半的高度)
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // 捕抓圖片的底部點位(圖片的頂部點位 + 圖片高度)
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    // 判斷是否視窗位置已超過圖片高度的一半
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    // 判斷是否視窗位置已經超過圖片
    const isNotScrolledPast = window.scrollY < imageBottom;
    // 判斷位置是否再圖片一半高且未超過圖片來增加及移除效果
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide)); // 監聽卷軸滾動的事件並進入checkSlide, 進入checkSlide前必須先處理因為卷軸滾動產生事件速度比較敏感的問題(只要有滾動產生就會產生), 所以需要多加一個函式debounce來幫助過濾掉短時間內的多次觸發
```

---

### **`補充 --`**

- Window.property

  - Window 物件代表一個包含 DOM 文件的視窗，Window 可以幫助取得目前使用瀏覽器介面屬性並進而操作使用
  - [MDN--Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

- debounce
  - [debounce 參考資料](https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086)
