import * as mysql from 'mysql';
import * as util from 'util';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:  'gamma!1110',
    database:  'qtalk'
  });
const query = util.promisify(con.query).bind(con);
export const addEntry = async (number: string, name: string, client: string) => {
    try {
        const createQuery = "INSERT INTO contact_info " +
                                "(clientId, number, name) " + 
                                "VALUES ('" +
                                client + "', '" +
                                number + "', '" +
                                name.replace('\'','\\\'') + "')";
        await query(createQuery);
    } catch (error) {
        console.error(error);
    }finally{
        return;
    }
}
export const updateEntry = async (number: string, name: string, client: string) => {
    try {
        
        const deleteQuery = "DELETE * from contact_info WHERE clientId = " + client + " AND number = " + number;
        await query(deleteQuery);

        const updateQuery = "INSERT INTO contact_info " +
                                "(clientId, number, name) " + 
                                "VALUES ('" +
                                client + "', '" +
                                number + "', '" +
                                name.replace('\'','\\\'') + "')";
        await query(updateQuery);
    } catch (error) {
        console.error(error);
    }finally{
        return;
    }
}
export const readEntry = async (number: string) => {
    let response;
    try {
        const readQuery = "SELECT name, COUNT(name) as count from contact_info WHERE number = \'" + number + "\' GROUP BY name";
        response = await query(readQuery);
        console.log(response);
    } catch (error) {
        console.error(error);
    }finally{
        return response;
    }
}