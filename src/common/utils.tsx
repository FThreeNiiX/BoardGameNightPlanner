import * as XMLParser from 'react-xml-parser';
export const getBggData = async (url:string):Promise<string> => {
    if(url.length === 0) return ''
    let thumbnail = '';
    const id =(url.substring(
         url.indexOf('/boardgame/') + 11, 
         url.lastIndexOf('/')
     ))
     const test = 'https://api.geekdo.com/xmlapi2/thing?id='+id;
     try{
        const response = await fetch(test);
        const responseData = await response.text()
         thumbnail = (new XMLParser().parseFromString(responseData).getElementsByTagName('image')[0]?.value);
      }
      catch(error){
      console.log(error)
      } 
      return thumbnail
}