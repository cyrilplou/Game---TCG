import dataMapper from "../../dataMapper.js"

const launchgameController = {

    renderStartPage(req,res){
        res.render('start.ejs')
    },
    async startGame(req,res){
        try{const cards = await dataMapper.mainDepart();
            res.json(cards)   } 
            catch (error) {
             console.error(error);
             res.status(500).send(`An error occured with the database :\n${error.message}`);
           }
     },
     async pickCard(req,res){
        try{
            const card = await dataMapper.pickCard();
            res.json(card)
         } catch (error) {
             console.error(error);
             res.status(500).send(`An error occured with the database :\n${error.message}`);
           }
     },
}

export default launchgameController
