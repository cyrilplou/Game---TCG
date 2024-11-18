import dataMapper from "../../dataMapper.js"

const mainController = {

    // Pages statiques
    renderLorePage(req,res){
        res.render('lore.ejs')
    },
    renderPlateauPage(req,res){
        res.render('plateau.ejs')
    
    },
    renderCiteePage(req,res){
        res.render('citees.ejs')
    
    },

//    Pages dynamique avec query
    async renderHome(req,res){
        try{const creature = await dataMapper.getAllCards();
             res.render('home.ejs')
         } catch (error) {
             console.error(error);
             res.status(500).send(`An error occured with the database :\n${error.message}`);
           }
     },
    async renderCardsPage(req,res){
        try{const cards = await dataMapper.getAllCards();
            res.render('cartes.ejs', {cards})
        } catch (error) {
                console.error(error);
                res.status(500).send(`An error occured with the database :\n${error.message}`);
              }
    
    },
    async renderCardsFilter(req,res){
        try{const cards = await dataMapper.getCardsByName();
            res.render('cartes.ejs', {cards})
        } catch (error) {
                console.error(error);
                res.status(500).send(`An error occured with the database :\n${error.message}`);
              }
    
    },
    async renderCardsEdit(req,res){
        const id = parseInt(req.params.id)
        try{const card = await dataMapper.cardEdit(id);
            res.render('carteEdit.ejs', {card})
    
        } catch (error) {
                console.error(error);
                res.status(500).send(`An error occured with the database :\n${error.message}`);
              }
    },
    async editOneCard(req,res){
    
        const id = req.params.id
        const description = req.body.cardDescription
        const attaque = parseInt(req.body.attaque)
        const defense = parseInt(req.body.defense)
        const cout = parseInt(req.body.cost)
        const rarity = req.body.rarity
        const name = req.body.cardname
        const aptitudes = req.body.cardAptitudes
        try{const cardEdit = await dataMapper.editCart(id,description,attaque,defense,cout,rarity,name,aptitudes);
            res.redirect('/cartes')
    
        } catch (error) {
                console.error(error);
                res.status(500).send(`An error occured with the database :\n${error.message}`);
        } 
    },
    async addOneCard(req,res){
        const description = req.body.cardDescription
      
        const attaque = parseInt(req.body.attaque)
        const defense = parseInt(req.body.defense)
        const cout = parseInt(req.body.cost)
        const citee = parseInt(req.body.city)
        const rarity = req.body.rarity
        const name = req.body.cardname
        const type = req.body.cardType
        const aptitudes = req.body.cardAptitudes
        const image = `/images/cards-img/${type}.webp`;
      
        try{const addcard = await dataMapper.addOneCard(description,attaque,defense,cout,citee,rarity,name,type,aptitudes,image);
            console.log(addcard)
                res.render('home.ejs')
            } catch (error) {
                console.error(error);
                res.status(500).send(`An error occured with the database :\n${error.message}`);
              }
    },
    async DeleteOneCard(req,res){

        const id = req.params.id
        console.log(id)
        try{const SuppCard = await dataMapper.SuppCard(id);
            res.redirect('/cartes')
    
        } catch (error) {
                console.error(error);
                res.status(500).send(`An error occured with the database :\n${error.message}`);
        } 
    },
    
}


export default mainController








 

