import React from "react";
import { getMessageById } from "lib/api/messages";
import Form from "../components/ui/messageForm";

const MessageIndividual = (props) => {
  return (
      <Form intialData={props.data} />
  );
};

export default MessageIndividual;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const data = await getMessageById(id);
  return { props: { data } };
};
