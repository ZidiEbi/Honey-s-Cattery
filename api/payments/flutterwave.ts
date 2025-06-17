import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { transaction_id } = req.body; // Flutterwave transaction ID from client

    if (!transaction_id) {
      return res.status(400).json({ error: "Transaction ID is required" });
    }

    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`, // Use Flutterwave Secret Key
        },
      }
    );

    if (response.data.status === "success" && response.data.data.status === "successful") {
      return res.status(200).json({ success: true, data: response.data.data });
    } else {
      return res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Flutterwave error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}