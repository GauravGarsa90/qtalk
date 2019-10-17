import { updateEntry } from '../utils/contactDataHandler';

export const update = async (req, res) => {
    for(let i = 0; i<req.body.data.length;i++){
        for(let j=0;j<req.body.data[i].numbers.length;j++){
            updateEntry(req.body.data[i].numbers[j],req.body.data[i].name,req.headers['user-id']);
        }
    }
    res.end();
}