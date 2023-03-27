import React from 'react';
import styles from '@/styles/messageList.module.css';
import MessageItem from "../components/ui/messageItem";
import { getAllmessages } from "../../lib/api/messages"
import Layout from "../../components/layout";

const MessageList = (props) => {
    return (
        <>
            <Layout>
                <div className={styles.container}>
                    {props?.data?.map((message) => (
                        <MessageItem message={message} />
                    ))}
                </div>
            </Layout>
        </>
    );
};

export async function getServerSideProps() {
    const messages = await getAllmessages();
    return { props: { data: messages } };
}

export default MessageList;