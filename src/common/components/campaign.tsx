import { bggContains } from "common/utils"
import React from "react"

interface CampaignProps {
    url: string
}

export const Campaign = ({ url }: CampaignProps) => {
    const [campaign, setCampaign] = React.useState(false)
    React.useEffect(() => {
        async function fetchData(link: string) {
            const response = await bggContains(url, "campaign")
            setCampaign(response)
        }
        if (url) {
            fetchData(url)
        }
    }, [url])

    return campaign ? <p> - Campaign</p> : null
}
