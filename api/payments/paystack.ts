import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { reference } = req.body; // Paystack reference from client

    if (!reference) {
      return res.status(400).json({ error: "Reference is required" });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Use Paystack Secret Key
        },
      }
    );

    if (response.data.status && response.data.data.status === "success") {
      return res.status(200).json({ success: true, data: response.data.data });
    } else {
      return res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Paystack error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}