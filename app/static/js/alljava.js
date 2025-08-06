document.addEventListener("DOMContentLoaded", () => {
  // ✅ ปุ่มลอยเปิด/ปิดกล่องแชท
  const chatbotBtn = document.getElementById("chatbot-button");
  const chatBox = document.getElementById("chat-box");

  if (chatbotBtn && chatBox) {
    chatbotBtn.addEventListener("click", () => {
      chatBox.classList.toggle("display-none");
    });
  }

  // ✅ ปุ่ม ❌ ปิดกล่องแชท
  const closeBtn = document.querySelector(".resize-button");
  if (closeBtn && chatBox) {
    closeBtn.addEventListener("click", () => {
      chatBox.classList.add("display-none");
    });
  }

  // ✅ โหลดข้อความเก่าในแชทจาก localStorage
  const chatMessages = document.getElementById("chat-messages");
  const savedChat = localStorage.getItem("chat_history");
  if (chatMessages && savedChat) {
    chatMessages.innerHTML = savedChat;
  }

  // ✅ กดส่งข้อความในแชท
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const userMsg = document.createElement("div");
      userMsg.className = "message user";
      userMsg.innerText = text;
      chatMessages.appendChild(userMsg);

      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // ✅ บันทึกแชทล่าสุดลง localStorage
      localStorage.setItem("chat_history", chatMessages.innerHTML);
    });
  }

  // ✅ ใช้ในบางหน้าที่มีประเภทเอกสาร
  const toggleReturnDate = () => {
    const docType = document.getElementById("doc_type_select")?.value;
    const returnDateRow = document.getElementById("return_date_row");

    if (returnDateRow) {
      if (docType === "advance") {
        returnDateRow.style.display = "flex";
      } else {
        returnDateRow.style.display = "none";
      }
    }
  };

  toggleReturnDate(); // เรียกตอน DOM โหลดเสร็จ
  const docTypeSelect = document.getElementById("doc_type_select");
  if (docTypeSelect) {
    docTypeSelect.addEventListener("change", toggleReturnDate);
  }

  // ✅ showTab() เวอร์ชันตรงจากโค้ดต้นฉบับ
  window.showTab = function (tabId) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.style.display = "none");
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(`tab-${tabId}`).style.display = "block";
    event.currentTarget.classList.add("active");
  };

  // ✅ showSubTab() เวอร์ชันตรงจากโค้ดต้นฉบับ
  window.showSubTab = function (tabId, btn) {
    const subTabs = document.querySelectorAll(".sub-tab-content");
    const subButtons = document.querySelectorAll(".sub-tab-button");

    subTabs.forEach(tab => tab.style.display = "none");
    subButtons.forEach(b => b.classList.remove("active"));

    document.getElementById(`subtab-${tabId}`).style.display = "block";
    btn.classList.add("active");
  };

  // ✅ split-table resizer (approve.html)
  const resizer = document.querySelector('.split-resizer');
  const left = document.querySelector('.split-table-left');

  let x = 0;
  let leftWidth = 0;

  const mouseDownHandler = (e) => {
    x = e.clientX;
    leftWidth = left?.getBoundingClientRect().width || 0;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (e) => {
    const dx = e.clientX - x;
    if (left) {
      left.style.width = `${leftWidth + dx}px`;
    }
  };

  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  if (resizer && left) {
    resizer.addEventListener('mousedown', mouseDownHandler);
  }

  // ✅ ปรับความสูงซ้าย/ขวาให้เท่ากัน (approve.html)
  const leftPane = document.querySelector(".split-table-left");
  const rightPane = document.querySelector(".split-table-right");
  if (leftPane && rightPane) {
    const maxHeight = Math.max(leftPane.scrollHeight, rightPane.scrollHeight);
    leftPane.style.height = rightPane.style.height = maxHeight + "px";
  }

  // ✅ ตรวจว่ามี split-table หรือไม่ → โหลด approve.css
  const hasSplitTable = document.querySelector(".split-table-wrapper");

  if (hasSplitTable) {
    const approveCssLoaded = Array.from(document.styleSheets).some(sheet =>
      sheet.href && sheet.href.includes("approve.css")
    );

    if (!approveCssLoaded) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "\static\approve.css"; // ✅ ปรับ path ตามจริงถ้าอยู่ใน static/css/
      link.type = "text/css";
      document.head.appendChild(link);
    }
  }
});