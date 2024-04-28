import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../environment/testEnvironment';

const ProfilePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState({});
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        const getUserDetail = async () => {
            const res = await axios.get(`${API_BASE_URL}/profile`, {
                headers: {
                    'Authorization': token
                }
            });
            setUser(res.data.data);
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
            const result =await axios.post(`${API_BASE_URL}/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token

                }
            });
            if(result?.data?.success){
                setUser({...user,profilePic:result.data.profilePic});
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };


    return (
        <div className='profile'>
            <div className='profile-div ' >
                <h1> User Profile</h1>
                <p className='user-detail'>Username :- {user.userName}</p>
                <p className='user-detail'>Email :- {user.email}</p>
                <input type='file' accept='image/*' onChange={handleFileChange} />
                <button className='appButton' onClick={handleUpload} disabled={!selectedFile}>Upload New Picture</button>
            </div >
            <div className='profile-pic'>
                {user.profilePic && <img src={`${API_BASE_URL}/${user.profilePic}`} alt='profile-pic' />}
            </div>
        </div>
    )
}

export default ProfilePage;
