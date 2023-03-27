import { getMessageById, updateMessageById } from "../../../lib/api/messages";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      if (!id) {
        return res.status(500).json({
          error: "id must be present",
        });
      }
      const result = await getMessageById(id);
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else if (req.method === "POST") {
    try {
      console.log("updating");
      const body = JSON.parse(req.body);
      console.log({ body });
      const result = await updateMessageById(id, body);
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
