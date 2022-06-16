import * as XMLParser from "react-xml-parser"
export const getBggData = async (url: string, key: string): Promise<string> => {
    if (url.length === 0) return ""
    let data = ""
    const id = url.substring(
        url.indexOf("/boardgame/") + 11,
        url.lastIndexOf("/")
    )
    const test = "https://api.geekdo.com/xmlapi2/thing?id=" + id
    try {
        const response = await fetch(test)
        const responseData = await response.text()
        data = new XMLParser()
            .parseFromString(responseData)
            .getElementsByTagName(key)[0]?.value
    } catch (error) {
        console.log(error)
    }
    return data
}

export const bggContains = async (
    url: string,
    key: string
): Promise<boolean> => {
    if (url.length === 0) return false
    let data = ""
    const id = url.substring(
        url.indexOf("/boardgame/") + 11,
        url.lastIndexOf("/")
    )
    const test = "https://api.geekdo.com/xmlapi2/thing?id=" + id
    try {
        const response = await fetch(test)
        const responseData = await response.text()
        data = new XMLParser().parseFromString(responseData)
    } catch (error) {
        console.log(error)
    }
    return JSON.stringify(data).indexOf("Campaign Games") > -1
}
