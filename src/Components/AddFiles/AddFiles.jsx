import React from 'react';
import { useState } from "react";
import { storage } from '../../firebace';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 
function AddFiles(props) {

    const { setFileUrl } = props;

    const [file, setFile] = useState("");
 
    const [percent, setPercent] = useState(0);
 
    function handleChangeFliles(e) {
        setFile(e.target.files[0]);
    }
 
    const handleUpload = (e) => {
        e.preventDefault();
 
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
            });        
            setFile(e.target.files = null);
    }
 
    return (
        <div className='file-add'>
            <input type="file" onChange={handleChangeFliles} />
            <button onClick={handleUpload}>Добавить файл</button>
            <p>{percent} % Завершено</p>
        </div>
    );
}
 
export default AddFiles;
