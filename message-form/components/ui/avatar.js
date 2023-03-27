/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from '@/styles/avatar.module.css';
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ImageUploading from "react-images-uploading";
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";

function Avatar({ avatar }) {

    let defaultAvatar = "https://imgs.search.brave.com/d_wpN3Pg11nxpPu9kzxsjcYEQ2_JXpoWxlCntGfvrGk/rs:fit:1000:1040:1/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pLzEwMDB4/MTAwMC8yMy83MC9t/YW4tYXZhdGFyLWlj/b24tZmxhdC12ZWN0/b3ItMTkxNTIzNzAu/anBn"
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const [avatarImageFile, setaAvatarImageFile] = useState([]);

    useEffect(() => {
        register("avatar", { required: "Avatar is required" });
    }, []);

    useEffect(() => {
        if (avatarImageFile) {
            setValue("avatar", avatarImageFile);
        }
    }, [avatarImageFile]);

    useEffect(() => {
        if (avatar) {
            setaAvatarImageFile(avatar);
        }
    }, [avatar]);

    const onChange = (imageList) => {
        setaAvatarImageFile(imageList);
    };



    return (
        <ImageUploading
            value={avatarImageFile}
            onChange={onChange}
            dataURLKey="data_url"
            acceptType={["jpg", "png"]}
        >
            {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                dragProps,
            }) => {
                return (
                    <section className=" flex justify-center flex-col gap-2">
                        <div className="flex justify-center">
                            <div
                                {...dragProps}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onImageUpload();
                                }}
                            >
                                <div className={styles.uploadFormContainer}>
                                    {imageList.length > 0 && (
                                        <div className={styles.imageContainer}>
                                            <img
                                                className={styles.uploadedImage}
                                                src={imageList[0].data_url}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                    {!imageList.length > 0 && (
                                        <div className={styles.imageContainer}>
                                            <img
                                                className={styles.uploadedImage}
                                                src={defaultAvatar}
                                                alt=""
                                            />
                                        </div>
                                    )}

                                    <div className={styles.editButtons}>
                                        <button
                                            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onImageUpdate();
                                            }}
                                        >
                                            {" "}
                                            <RiEdit2Fill className="h-5 w-5" />
                                        </button>
                                        <button
                                            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onImageRemove();
                                            }}
                                        >
                                            <RiDeleteBin6Fill className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name={"avatar"}
                            render={({ message }) => (
                                <p className=" text-sm text-red-400 mt-2 text-center"> {message}</p>
                            )}
                        />
                    </section>
                );
            }}
        </ImageUploading>
    );
}

export default Avatar;
