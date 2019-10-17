import { readEntry } from '../utils/contactDataHandler';

export const read = async (req, res) => {

    console.log('read request: ', req.query.number);
    const response = await readEntry(req.query.number)
    let max = 0;
    let out = '';
    if(response.length===0){
        res.end()
    }else{
        for(let i=0;i<response.length;i++){
            if(response[i].count>max){
                max = response[i].count;
                out = response[i].name;
            }
        }
    }
    res.end(out);
}