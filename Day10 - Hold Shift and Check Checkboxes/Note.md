## **Day10 Note**

<div align=center><img src="hold_shift_and_check_checkboxes.png" width=800></div>

---
### `本日主要內容 --`
#### 1. 使用Shift + 滑鼠左鍵完成選取連續區間功能

---


### `解析 --`

```js

  const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');  // 選取class=inbox內所有input中的checkbox

  let lastChecked;  // 宣告一變數紀錄上次點擊的input


  function handleCheck(e) {
    let inBetween = false;
    // 檢查是否點選shift
      if (e.shiftKey && this.checked) {
      // 如果shift被按下且按鈕有被checked
      checkboxes.forEach(checkbox => {
        // 進入checkboxed去偵測每個input是否為最初點擊到的input(this)或是最後點擊的input(lastChecked)
        if (checkbox === this || checkbox === lastChecked) {
          // 如果checkbox等同於最初或最後點擊的input
          inBetween = !inBetween; // 點選shift的檢查變為true
        }

        if (inBetween) {  // 如果點選shift的檢查變為true
          checkbox.checked = true;  // 那麼在這區間的checkbox都變為checked狀態
        }
      })
    }
    lastChecked = this; // 紀錄這次點擊的input
  }


  checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));  // 監聽checkboxed內的每個check被滑鼠點擊事件並觸發進入handleCheck

```



---

### **`補充 --`**
* keyboardEvent
  * keyboardEvent是用來記錄經由鍵盤產生的動作，其中鍵盤事件類型keyup、keydwon、keypress各是用來表示鍵盤執行那些動作
  * [MSN--KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)