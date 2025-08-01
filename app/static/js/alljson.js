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
      if (docType === "advance" || docType === "clear_advance") {
        returnDateRow.style.display = "flex";
      } else {
        returnDateRow.style.display = "none";
      }
    }
  };

  toggleReturnDate();
});
