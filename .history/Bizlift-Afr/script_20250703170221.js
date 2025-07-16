  const backendUrl = "https://d71ff715-b391-44b0-a54b-728a48c4329c-00-25llgf9qh1odx.kirk.replit.dev/generate"; // use your real backend URL

  async function generateIdeas() {
    const age = document.getElementById("age").value;
    const location = document.getElementById("location").value;
    const budget = document.getElementById("budget").value;
    const interest = document.getElementById("interest").value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = `<p><strong>Thinking with Gemini AI...</strong></p>`;

    const prompt = `You are a business coach helping Nigerian youth.
    Suggest 3 low-budget business ideas for someone who is ${age} years old, living in ${location}, interested in ${interest}, with a ₦${budget} budget.
    For each idea, recommend:
    - 1 educational resource (video or article)
    - 1 social media mentor to follow (Instagram, TikTok, or LinkedIn)
    Make the ideas simple, practical, and local.`;

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.reply) {
        resultDiv.innerHTML = `
          <h3>Your Personalized Business Ideas:</h3>
          <p>${data.reply.replace(/\n/g, "<br>")}</p>
        `;
      } else {
        resultDiv.innerHTML = `<p style="color:red;">No idea received from Gemini.</p>`;
      }
    } catch (error) {
      console.error("Frontend error:", error);
      resultDiv.innerHTML = `<p style="color:red;">Something went wrong. Please try again.</p>`;
    }
  }
