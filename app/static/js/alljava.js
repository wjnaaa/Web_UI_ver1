document.addEventListener("DOMContentLoaded", () => {
  // ============ Chat box ============ //
  const chatbotBtn = document.getElementById("chatbot-button");
  const chatBox = document.getElementById("chat-box");
  if (chatbotBtn && chatBox) {
    chatbotBtn.addEventListener("click", () => chatBox.classList.toggle("display-none"));
  }
  const closeBtn = document.querySelector(".resize-button");
  if (closeBtn && chatBox) {
    closeBtn.addEventListener("click", () => chatBox.classList.add("display-none"));
  }

  const chatMessages = document.getElementById("chat-messages");
  const savedChat = localStorage.getItem("chat_history");
  if (chatMessages && savedChat) chatMessages.innerHTML = savedChat;

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
      localStorage.setItem("chat_history", chatMessages.innerHTML);
    });
  }

  // ============ Toggle Return Date ============ //
  window.toggleReturnDate = function () {
    const docType = document.getElementById("doc_type_select")?.value;
    const row = document.getElementById("return_date_row");
    if (!row) return;
    row.style.display = (docType === "advance") ? "flex" : "none";
  };
  window.toggleReturnDate();
  const docTypeSelect = document.getElementById("doc_type_select");
  if (docTypeSelect) docTypeSelect.addEventListener("change", window.toggleReturnDate);

  // ============ Main Tabs ============ //
  window.showTab = function (tabId, btn) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-button");
    tabs.forEach(el => el.style.display = "none");
    buttons.forEach(b => b.classList.remove("active"));

    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.style.display = "block";
    if (btn) btn.classList.add("active");

    // ถ้าเข้าแท็บเอกสาร ให้แน่ใจว่ามี sub-tab ถูกเปิด
    if (tabId === "doc") {
      const docTab = document.getElementById("tab-doc");
      if (!docTab) return;
      const activeSubBtn = docTab.querySelector(".sub-tab-button.active");
      if (activeSubBtn) {
        // ใช้ data-id ที่ปุ่ม หรือเดาจาก id เป้าหมาย
        const firstShown = docTab.querySelector(".sub-tab-content[style*='display: block']");
        if (!firstShown) activeSubBtn.click();
      } else {
        const firstBtn = docTab.querySelector(".sub-tab-button");
        if (firstBtn) firstBtn.click();
      }
    }
  };

  // ============ Sub Tabs (inside #tab-doc) ============ //
  window.showSubTab = function (tabId, btn) {
    const container = document.getElementById("tab-doc");
    if (!container) return;

    container.querySelectorAll(".sub-tab-content").forEach(el => el.style.display = "none");
    container.querySelectorAll(".sub-tab-button").forEach(b => b.classList.remove("active"));

    const target = document.getElementById(`subtab-${tabId}`);
    if (target) target.style.display = "block";
    if (btn) btn.classList.add("active");

    if (tabId === "doc-expense") {
      const wrap  = target.querySelector(".split-table-wrapper");
      const left  = target.querySelector(".split-table-left");
      const right = target.querySelector(".split-table-right");
      if (wrap) wrap.style.flexDirection = "row";  // กันถูก approve.css เปลี่ยนเป็น column

      // ตั้งค่าเริ่มต้นครั้งแรก
      if (left && right && !left.style.width && !right.style.width) {
        left.style.width  = "45%";
        right.style.width = "calc(55% - 8px)";
      }

      // ติดตั้ง resizer ครั้งเดียว
      const resizer = target.querySelector(".split-resizer");
      if (resizer && !resizer._installed && left && wrap) {
        resizer._installed = true;
        let startX = 0, startLeft = 0;

        const onMove = (ev) => {
          const dx = ev.clientX - startX;
          const newW = Math.max(150, startLeft + dx);
          const maxW = wrap.clientWidth - 150 - resizer.offsetWidth;
          left.style.width = Math.min(maxW, newW) + "px";
        };
        const onUp = () => {
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
          document.body.style.cursor = "";
        };

        resizer.addEventListener("mousedown", (e) => {
          e.preventDefault();
          startX = e.clientX;
          startLeft = left.getBoundingClientRect().width;
          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
          document.body.style.cursor = "col-resize";
        });
      }
    }
  };

  // ============ Initial State on Load ============ //
  // ซ่อนแท็บทั้งหมดก่อน แล้วเปิดแท็บ "doc"
  document.querySelectorAll(".tab-content").forEach(el => el.style.display = "none");
  const tabDocBtn = document.querySelector(".tab-header .tab-button"); // ปุ่มแรก (doc)
  const tabDoc = document.getElementById("tab-doc");
  if (tabDoc) tabDoc.style.display = "block";
  if (tabDocBtn) tabDocBtn.classList.add("active");

  // ตั้งค่า sub-tab เริ่มต้นให้โชว์เฉพาะรายละเอียดเอกสาร
  if (tabDoc) {
    tabDoc.querySelectorAll(".sub-tab-content").forEach(el => el.style.display = "none");
    tabDoc.querySelectorAll(".sub-tab-button").forEach(b => b.classList.remove("active"));
    const detail = document.getElementById("subtab-doc-detail");
    const detailBtn = tabDoc.querySelector(".sub-tab-button");
    if (detail) detail.style.display = "block";
    if (detailBtn) detailBtn.classList.add("active");
  }

  // ============ Autoload approve.css if needed ============ //
  const hasSplitTable = document.querySelector(".split-table-wrapper");
  if (hasSplitTable) {
    const approveCssLoaded = Array.from(document.styleSheets).some(
      sheet => sheet.href && sheet.href.includes("approve.css")
    );
    if (!approveCssLoaded) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/static/approve.css"; // ปรับ path ให้ตรงของคุณ
      link.type = "text/css";
      document.head.appendChild(link);
    }
  }
});
