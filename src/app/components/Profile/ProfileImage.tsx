import React from 'react'


const ProfileImage = ({
    image
}: IProfileImage) => {
    console.log("image", image);

    return (
        <div className="profile-foreground position-relative mx-n4">
            <div className="profile-wid-bg">
                {/* <LazyImage src={image} alt="" className="profile-wid-img" /> */}
            </div>
        </div>
    )
}
interface IProfileImage {
    image: string
}

export default ProfileImage