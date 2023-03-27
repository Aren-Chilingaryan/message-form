import { getAllmessages, createMessage } from "../../../lib/api/messages";

export default async function handler( req, res) {
  if (req.method === "GET") {
    try {
      const result = await getAllmessages();
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      console.log("inserting message");
      const body = JSON.parse(req.body);
      const result = await createMessage(body);
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = { api: { bodyParser: { sizeLimit: "25mb" } } };
