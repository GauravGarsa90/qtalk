import { addEntry } from '../utils/contactDataHandler';

export const create = async (req, res) => {
    for(let i = 0; i<req.body.data.length;i++){
        for(let j=0;j<req.body.data[i].numbers.length;j++){
            addEntry(req.body.data[i].numbers[j],req.body.data[i].name,req.headers['user-id']);
        }
    }
    res.end();
}