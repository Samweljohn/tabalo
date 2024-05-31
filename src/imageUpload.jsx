import React, { useState ,useEffect } from 'react';

export default function ImageUploader({ onImageChange , resetImage}) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        // Reset the image when resetImage prop changes
        if (resetImage) {
            setImage(null);
        }
    }, [resetImage]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        onImageChange(file); 
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                // Pass the image value to the parent component
                //onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="image-upload">
            <label htmlFor="file-input">
                {image ? (
                    <img src={image} alt="Preview" className='image-preview' />
                ) : (
                    <div className="overlay">
                        <span>+</span>
                        <p>Click to select an image</p>
                    </div>
                )}
            </label>
            <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className='hidenImageINFO' />
        </div>
    );
}
