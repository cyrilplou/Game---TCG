import database from './database.js'; 

// Toutes mes requêtes partent d'ici ! A retrouver dans les Controllers.
const dataMapper = {
  async getAllCards() {
    const query = "SELECT * FROM creatures";
    const result = await database.query(query);
    return result.rows;
  },
  async addOneCard(description,attaque,defense,cout,citee,rarity,name,type,aptitudes,image){
    const query = "INSERT INTO creatures (description,value_attaque,value_defense,cost,city_id,rarity,name,type,aptitudes,image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    const VALUES = [description,attaque,defense,cout,citee,rarity,name,type,aptitudes,image] ;
    const result = await database.query(query,VALUES)
  },

  async getCardsByName(){
    const query = "SELECT * FROM creatures ORDER BY name ASC";
    const result = await database.query(query);
    return result.rows;
  },
  
  async cardEdit(id){
    const query = "SELECT * FROM creatures WHERE id=$1";
    const value=[id];
    const result = await database.query(query,value);
    return result.rows[0];
  },
  async editCart(id,description,attaque,defense,cout,rarity,name,aptitudes){
    const query = "UPDATE creatures SET description = $1, value_attaque =$2,value_defense =$3,cost=$4,rarity=$5,name=$6,aptitudes=$7 WHERE id=$8";
    const value=[description,attaque,defense,cout,rarity,name,aptitudes,id];
    const result = await database.query(query,value);
    return result.rows[0];
  },
  async SuppCard(id){
    const query = "DELETE FROM creatures WHERE id=$1";
    const value=[id];
    const result = await database.query(query,value);
  },






















  async mainDepart(){
    const query = "SELECT * FROM creatures ORDER BY RANDOM() LIMIT 6";
    const result = await database.query(query);
    return result.rows;
  },
  async pickCard(){
    const query = "SELECT * FROM creatures ORDER BY RANDOM() LIMIT 1";
    const result = await database.query(query);
    return result.rows[0];
  },
};



export default dataMapper;
