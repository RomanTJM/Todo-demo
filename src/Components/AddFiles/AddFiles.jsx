import React from 'react';
import { useState } from "react";
import { storage } from '../../firebace';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 
function AddFiles() {

    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState("");
 
    const [percent, setPercent] = useState(0);
 
    function handleChangeFliles(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
 
        const storageRef = ref(storage, `/files/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
            setPercent(percent);    
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setFileUrl(url);
                });
            }
        );
    };
 
    return (
        <div>
            <input type="file" onChange={handleChangeFliles} />
            <button onClick={handleUpload}>Добавить файл</button>
            <p>{percent} "% Завершено"</p>
            <a target="_blank" href={fileUrl}>{fileUrl}</a>
        </div>
    );
}
 
export default AddFiles;
