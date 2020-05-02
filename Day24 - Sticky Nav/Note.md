## **Day24 Note**

### `本日主要內容 --`

#### 1. 偵測選單到頂部的高度

#### 2. 網頁卷軸高度偵測並調整選單樣式

---

### `解析 --`

```js
// 選取出nav,並先宣告一變數放入nav到頂部的距離
const nav = document.querySelector("#main");
const topOfNav = nav.offsetTop;

// 偵測頁面卷軸的高度配置不同的nav狀態
function fixNav() {
  // 假如卷軸的高度高過於nav到頂部的距離, 將body加入新增的css屬性, 為避免內容會有彈跳狀態出現,所以為內容增加nav高度; 假如是其他情況,則nav維持原本狀態(移除掉新增的css屬性並將額外增加的padding高度恢復)
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + "px";
    document.body.classList.add("fixed-nav");
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove("fixed-nav");
  }
}

// 監聽頁面卷軸滾動時進入fixNav
window.addEventListener("scroll", fixNav);
```

```css
/* 當body加入".fixed-nav"時的一系列屬性調整 */
/* .fixed-nav時, 段落放大(原為scale(0.98)) */
.fixed-nav .site-wrap {
  transform: scale(1);
}

/* .fixed-nav時, nav改為fixed並加入陰影 */
.fixed-nav nav {
  position: fixed;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.1);
}

/* .fixed-nav時, 將nav內的logo增加寬度使之顯示 */
.fixed-nav li.logo {
  max-width: 500px;
}
```

---

### **`補充 --`**

- offset & client & scroll
- offset
  1.  offsetWidth & offsetHeight: 指物件自身的寬高。
  2.  offsetTop & offsetLeft: 當前物件到其上級層頂部及左邊的距離
  3.  offsetParent: 當前物件的上級層物件
- client
  1.  clientWidth & clientHeight: 內容可視區域的寬高
- scroll
  1.  scrollTop & scrollLeft: 縱向及橫向滾動條拉動的距離
  2.  scroolHeight: 滾動條捲動的高度
