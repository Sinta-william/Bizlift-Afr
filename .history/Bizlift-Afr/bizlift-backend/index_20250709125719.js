      const express = require("express");
      const cors = require("cors");
      const app = express();
      const port = 3000;

      // ✅ Your API key from Google MakerSuite or Cloud Console
      const API_KEY = "AIzaSyD--tTsJv0i6Cns9Iqxne2FDfWhP-yH7mg"; // replace this

      app.use(cors());
      app.use(express.json());

      app.post("/generate", async (req, res) => {
        const { prompt } = req.body;

        try {
          const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=" + API_KEY
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt: {
                  messages: [
                    {
                      author: "user",
                      content: prompt,
                    },
                  ],
                },
              }),
            }
          );

          const data = await response.json();
          const reply = data?.candidates?.[0]?.content;

          if (!reply) {
            console.log("⚠️ No valid reply:", data);
            return res.status(500).json({ error: "No reply received from Chat-Bison." });
          }

          res.json({ reply });
        } catch (error) {
          console.error("💥 Chat-Bison API Error:", error);
          res.status(500).json({ error: "Something went wrong with Chat-Bison." });
        }
      });

      app.listen(port, () => {
        console.log(`✅ Chat-Bison server running at http://localhost:${port}`);
      });
