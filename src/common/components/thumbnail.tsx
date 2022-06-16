import { getBggData } from 'common/utils';
import React from 'react'

interface ThumbnailProps {
    url: string
}

export const Thumbnail = ({url}: ThumbnailProps) =>{
    const [thumbnail,setThumbnail] = React.useState('');
    React.useEffect(() => {
        async function fetchData(link:string) {
            const response = await getBggData(url)
            setThumbnail(response)
        }
        if(url){
         fetchData(url);
        }
      }, [url]);

      return <img src={thumbnail} alt="thumbnail" />
}