import clientPromise from "lib/api/mongo";
import { ObjectId } from "mongodb";

export const createMessage = async (data) => {
  const client = await clientPromise;
  const myDB = client.db(process.env.DB_NAME);
  const messages = myDB.collection("messages");
  const result = await messages.insertOne(data);
  return result;
};

export const getAllmessages = async () => {
  const client = await clientPromise;
  const myDB = client.db(process.env.DB_NAME);
  const messages = myDB.collection("messages");
  const result = await messages.find({}).toArray();

  return result.map((doc) => ({
    _id: doc._id.toString(),
    message: doc.message,
    avatar: doc.avatar,
    date: doc.date,
    status: null,//doc.status,
    title: doc.title
  }));
};

export const getMessageById = async (id) => {
  if (!id) {
    throw new Error("Id must be present");
  }
  const client = await clientPromise;
  const myDB = client.db(process.env.DB_NAME);
  const messages = myDB.collection("messages");
  const objectId = new ObjectId(id);
  const result = await messages.findOne({ _id: objectId });

  return { ...result, _id: result._id.toString() };
};

export const updateMessageById = async (_id, data) => {
  delete data._id;
  const client = await clientPromise;
  const myDB = client.db(process.env.DB_NAME);
  const messages = myDB.collection("messages");
  const objectId = new ObjectId(_id);

  console.log({ _id }, data);

  const result = await messages.replaceOne({ _id: objectId }, data);

  return result;
};
