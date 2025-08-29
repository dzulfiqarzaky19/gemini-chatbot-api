const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = input.value.trim();

  if (!userMessage) return;

  appendMessage({
    sender: "user",
    text: userMessage,
  });

  input.value = "";

  // Add "Thinking..." message
  const thinkingMessage = appendMessage({
    sender: "bot",
    text: "Gemini is thinking...",
  });

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data.result);

    if (data.result) {
      console.log(data.result, 1);

      setMessageHTML(thinkingMessage, data.result);
    } else {
      setMessageHTML(thinkingMessage, "Sorry, no response received.");
    }
  } catch (error) {
    console.error("Error fetching chat response:", error);

    //If something went wrong, modify the "Thinking..." message to show error
    setMessageHTML(thinkingMessage, "Failed to get response from server.");
  }
});

function renderGeminiMarkdown(rawText) {
  // Configure marked
  marked.setOptions({
    gfm: true,
    breaks: true, // honor single line breaks
    smartypants: true, // nicer quotes/dashes
  });

  // Parse markdown to HTML
  const dirtyHTML = marked.parse(rawText || "");

  // Sanitize HTML
  const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });

  return cleanHTML;
}

// Helper to inject + highlight
function setMessageHTML(el, rawText) {
  el.innerHTML = `<div class="markdown-body">${renderGeminiMarkdown(
    rawText
  )}</div>`;

  // Syntax highlighting (optional)
  if (window.hljs) {
    el.querySelectorAll("pre code").forEach((block) =>
      hljs.highlightElement(block)
    );
  }
}

function appendMessage({ sender, text }) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  setMessageHTML(msg, text);

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}
