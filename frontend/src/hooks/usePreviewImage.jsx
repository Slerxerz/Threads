import { useState } from "react"

const usePreviewImage = () => {
    const [imageURL,setImageURL] =useState(null)
    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        console.log(file)
    }
    return {handleImageChange,imageURL}
}

export default usePreviewImage