import React, { useState } from 'react';
import styles from '@/styles/messageItem.module.css';

const MessageItem = ({ message }) => {
    const date = new Date(message?.date)
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const formattedDate = date.toLocaleDateString('en-US', options).replace(/\//g, '.').replace(',', '');

    return (
        <>
            <div>
                <div className={styles.container}>
                    <div className={styles.dateContainer}>
                        <h5>{formattedDate}</h5>
                    </div>
                    <div className={styles.avatarContainer} >
                        <img className={styles.avatar} src={message.avatar}></img>
                        <div>
                            <h4>{message.title}</h4>
                        </div>
                    </div>
                    <div className={styles.messaegContainer} >
                        {message.message}
                    </div>
                    <div className={styles.editButton}>
                        <div>
                            <a
                                href={`/messages/${message._id}`}
                            >
                                edit
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default MessageItem;
