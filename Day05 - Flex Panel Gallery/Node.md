## **Day5 Note**


<div align=center><img src="flex_panel_gallery.png" width=800></div>

---
### `本日主要內容 --`
#### 1. 練習CSS的flex、transform、transition等功能
#### 2. 運用CSS與JS製作點擊圖片產生展開圖片的展示效果

---


### `解析 --`


```css
  /* 最外層設定 */
  .panels {
    min-height: 100vh; /* 設定最小高度為100vh, vh代表螢幕可視範圍高度的百分比 */
    overflow: hidden;
    display: flex; /* 外容器div設定flex, 如此5張圖片為內元件(此時圖片由平行轉為垂直,圖片文字在最上方) */
  }


  /* 進入圖片區域 */
  .panel {
    background: #6B0F9C;
    box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1);
    color: white;
    text-align: center;
    align-items: center;
    /* Safari 使用的屬性名為flex */
    /* Chrome & FireFox則為flex-grow */
    transition:
      font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
      flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
      background 0.2s;
    font-size: 20px;
    background-size: cover;
    background-position: center;
    flex: 1; /* 設定每個panel最大占位為1, 5張圖片各為1,則每張圖片最大占位為20% */
    display: flex; /* 以panel為外容器設定flex, 如此圖片內文字為內元件, 此時可設定以下屬性調整文字位置(如無則無效果) */
    justify-content: center; /* 依照主軸對齊 */
    align-items: center; /* 依照交錯軸對齊 */
    flex-direction: column; /* 改變軸線做垂直 */
    /* 此處設定完成圖片文字將位於圖片正中間垂直顯示*/
  }

    /* 進入圖片的文字區域 */
  .panel>* {
    margin: 0;
    width: 100%;
    transition: transform 0.5s;
    /* border: 1px solid red; --> 在調整文字位置時可添加boder當準則線來判斷是否達到需求 */
    flex: 1 0 auto;  /* 設定元件伸展性,收縮性,基準值. 完成後文字各佔位1並位於各自位置中的最上方  */
    display: flex; /* 將圖片文字區域設為外容器好再細部調整各文字位置 */
    justify-content: center; 
    align-items: center;
    /* 此處完成後圖片,文字皆就定位 */
  }

  .panel>*:first-child {
    transform: translateY(-100%);  /* 將圖片裡第一個文字移出畫面 */
  }

  .panel.open-active>*:first-child {
    transform: translateY(0%);  /* 圖片展開後,將圖片裡第一個文字移回畫面 */
  }

  .panel>*:last-child {
    transform: translateY(100%);  /* 將圖片裡最後一個文字移出畫面 */
  }

  .panel.open-active>*:last-child {
    transform: translateY(0%);   /* 圖片展開後,將最後一個文字移回畫面 */
  }

```

---

```js

  const panels = document.querySelectorAll(".panel"); //選取出所有.panel

  function taggelOpen(e) {
    this.classList.toggle("open");  // 於panel加入.open,使圖片展開
  }

  function taggleActive(e) {
    // console.log(e.propertyName);
    if (e.propertyName.includes("flex")) {
      this.classList.toggle("open-active"); // 如css transition內含有屬性名包含flex的屬性,則觸發將第一個文字及最後一個文字傳回畫面
    }
  }

  panels.forEach(panel => panel.addEventListener("click", taggelOpen)) // 監聽點擊事件,發生事件進入taggleOpen
  panels.forEach(panel => panel.addEventListener("transitionend", taggleActive))  // 監聽CSS transition(open內屬性flex,font-size)事件結束後觸發進入taggleActive,
  

```

---

### **`補充 --`**
* flex
  * flex中分為外容器與內元件，如屬性放錯地方就沒有作用
  * 外容器屬性 : flex-flow(flex-direction, flex-wrap), justify-content, align-items
  * 內元件屬性 : flex(flex-grow, flex-shrink, flex-basis), order, align-self
  * 使用flex一開始要宣告display: flex;才能使用(另外還有inline-flex類似block+flex)，
  * [MDN--flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)

* 常用單位px % vh vw em rem
  * px為像素，%為百分比，vh為螢幕可視範圍高度，vw為螢幕可視範圍寬度
  * vh與vw為螢幕可視範圍百分比，故隨著瀏覽器縮放變化亦會配合改變
  * px是絕對數值，不受外圍單位影響；em為相對數值，會受外圍的文字大小所影響(如外層文字大小為15px，內層1em=15px)，rem也是相對數值，但與em不同在於rem的尺寸只會受到root(網頁中的html)影響(如網站文字大小設定為16px，那1rem=16px，無論外層是否有其他文字大小皆不會影響)
  * 另外，常看到em與rem會出現1.3 1.4 1.5...數值，此表示文字大小幾倍(如font-size=15px，1em或1rem=15px， 1.5則是15*1.5=22.5px)

* transform & transition
  * transform提供元素呈現變形特效，常用像是旋轉、縮放、移動、傾斜等等
  * [MDN--transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
  * transition可調整元素變化的特效，他是一個整合式的語法，主要參數有四個，分別為產生效果的屬性名稱、發生的時間、效果發生的速度、是否延後發生效果
  * [MDN--transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)


* toggle
  * 偵測是否存在指定的className，如存在則刪除，若不存在則新增，再搭配CSS做到動態效果上很方便
  * [MDN--classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)