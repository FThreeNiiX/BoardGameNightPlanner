import { getBggData } from "common/utils"
import React from "react"

interface ThumbnailProps {
    url: string
    small: boolean
}

export const Thumbnail = ({ url, small }: ThumbnailProps) => {
    const [thumbnail, setThumbnail] = React.useState("")
    React.useEffect(() => {
        async function fetchData(link: string) {
            const response = await getBggData(
                url,
                small ? "thumbnail" : "image"
            )
            setThumbnail(response)
        }
        if (url) {
            fetchData(url)
        }
    }, [url])

    return <img src={thumbnail} alt="thumbnail" />
}
