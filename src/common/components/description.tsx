import { getBggData } from "common/utils"
import he from "he"
import React from "react"

interface DescriptionProps {
    url: string
}

export const Description = ({ url }: DescriptionProps) => {
    const [description, setDescription] = React.useState("")
    React.useEffect(() => {
        async function fetchData(link: string) {
            const response = await getBggData(url, "description")
            setDescription(response)
        }
        if (url) {
            fetchData(url)
        }
    }, [url])

    return (
        <p>
            {/* {he.decode(description)} */}
            {he.unescape(he.decode(description))}
        </p>
    )
    return <p>{description}</p>
}
