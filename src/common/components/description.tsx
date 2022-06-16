import { getBggData } from 'common/utils';
import React from 'react'

interface DescriptionProps {
    url: string
}

export const Description = ({url}: DescriptionProps) =>{
    const [description,setDescription] = React.useState('');
    React.useEffect(() => {
        async function fetchData(link:string) {
            const response = await getBggData(url, 'description')
            setDescription(response)
        }
        if(url){
         fetchData(url);
        }
      }, [url]);

      return <p>{description}</p>
}