const express = require("express"); // Use CommonJS syntax for express
const sendEmail = require("./utils/sendEmail"); // Adjusted import for CommonJS
const hotline = require("./data/hotline"); // Make sure this file exports your hotline data
const router = express.Router();

router.post("/help", async (req, res) => {
  try {
    const { userId, crisisDescription, location } = req.body;

    if (!userId || !crisisDescription) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Alert message content
    const alertMessage = `
      Crisis Alert Triggered:
      User ID: ${userId}
      Crisis Description: ${crisisDescription}
      Location: ${location || 'Not provided'}

      Immediate action required!
    `;

    // Send alert to crisis intervention team (via email, SMS, etc.)
    await sendEmail({
      to: "crisis-team@example.com",
      subject: "URGENT: Crisis Alert",
      text: alertMessage,
    });

    res.status(200).json({ message: "Crisis alert triggered successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to trigger crisis alert" });
  }
});

// Changed from "/hotline" to "/hotlines"
router.get("/hotlines", (req, res) => {
  console.log("GET request received at /crisis/hotlines"); // Log the request
  try {
      const { location } = req.query;
      
      if (location) {
          const filteredHotlines = hotline; // Implement filtering logic if needed
          console.log("Filtered hotlines based on location:", filteredHotlines);
          return res.status(200).json(filteredHotlines);
      } else {
          console.log("Returning all hotlines");
          return res.status(200).json(hotline); // Return all hotlines
      }
  } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ error: "Failed to retrieve hotlines" });
  }
});

module.exports = router; // Use CommonJS export
