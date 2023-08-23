import React from "react";
import { LazyImage } from "@app/components";
import { httpImage } from "@app/helper/string.helper";

export default function TextImage({
    text,
    image,
    classAvatar='avatar-sm',
    bgAvatar='bg-light',
    typeAvatar='rounded'
}: ITextImage) {

    return (
        <>
            <div className="d-flex align-items-center"> 
                <div className="flex-shrink-0 me-3"> 
                    <div className={`${classAvatar} ${bgAvatar} ${typeAvatar}`}> 
                        <LazyImage src={httpImage(image)} className="fit img-fluid d-block" defaultImage='/static/no-image.png' />
                    </div> 
                </div> 
                <div className="flex-grow-1"> 
                    <p className="mb-0"> 
                        <span className="fw-medium"> 
                            {text} 
                        </span> 
                    </p> 
                </div> 
            </div>
        </>
    )
}
interface ITextImage {
    text: string
    classAvatar?: string
    bgAvatar?: string
    typeAvatar?: string
    image: any
}