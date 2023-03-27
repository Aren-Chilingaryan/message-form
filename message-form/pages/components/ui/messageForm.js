import React, { useState, useEffect } from 'react';
import styles from '@/styles/messageForm.module.css';
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import AvatartImage from "../../../components/ui/avatar";
import { base64toFileNew } from "../../../lib/utils/convertFile";
import { toast } from "sonner";


const MessageForm = ({ intialData }) => {

  const [title, setTitle] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setText] = useState("");

  const methods = useForm({
    defaultValues: {},
  });


  const router = useRouter();
  useEffect(() => {
    if (intialData) {
      const message = intialData.message
      const title = intialData.title
      const avatar = intialData.avatar?.map((image) =>
        base64toFileNew(image, "avatar")
      );
      setAvatar(avatar);
      setTitle(title)
      setText(message)
      methods.reset({ ...intialData, avatar, message, title });
    }
  }, [intialData]);


  const onSubmit = (data) => {
    const avatar = data?.avatar?.map((image) => image.data_url) || [];
    const finalData = {
      ...data,
      message,
      title,
      avatar,
      date: new Date()
    };

    if (intialData) {
      const { id } = router.query;
      toast.promise(
        fetch(`/api/messages/${id}`, {
          method: "POST",
          body: JSON.stringify(finalData),
        }).then(() => {
          router.push("/messages");
        }),
      );
    } else {
      toast.promise(
        fetch("/api/messages", {
          method: "POST",
          body: JSON.stringify(finalData),
        }).then(() => {
          router.push("/messages");
        }),
      );
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className={styles.addMessageform}>
            < AvatartImage avatar={avatar} />
          <div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="title">Title:</label>
            <input
              className={styles.input}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="text">Text (limited to 160 characters):</label>
            <textarea
              className={styles.textarea}
              id="text"
              maxLength="160"
              value={message}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
          >Submit
          </button>
        </div>
      </FormProvider>
    </>
  );
};

export default MessageForm;