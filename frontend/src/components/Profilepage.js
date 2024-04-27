import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ProfilePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        const getUserDetail = async () => {
            const res = await axios.get('http://localhost:5000/api/profile', {
                headers: {
                    'Authorization': token
                }
            });
            setUser(res.data.data);
            const blob = new Blob([res.data.data.profilePic], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        };
        getUserDetail();
        //eslint-disable-next-line
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('email', user.email);
            await axios.post('http://localhost:5000/api/profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token

                }
            });
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };


    return (
        <div>
            <div className='profile-div ' >
                <h1> User Profile</h1>
                <p className='user-detail'>Username :- {user.userName}</p>
                <p className='user-detail'>Email :- {user.email}</p>
                <input type='file' accept='image/*' onChange={handleFileChange} />
                <button className='appButton' onClick={handleUpload} disabled={!selectedFile}>Upload</button>
                <div className='profile-pic'>
                    {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected" />}
                </div>
            </div >
            <div className='profile-pic'>
                {user.profilePic && <img src={imageUrl} alt='profile-pic' />}
                {/* {user.profilePic && <img src={`../../../backend/uploads/${user.profilePic}`} alt='profile-pic' />} */}
            </div>
        </div>

    )
}
export default ProfilePage;