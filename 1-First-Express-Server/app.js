let beers = [{
    id: 1,
    name: 'Grøn Tuborg',
    brand: 'Tuborg',
    date: '07/07-2003'
}];
let nextId = 2;

const express = require("express");
const app = express();
app.use(express.json());

// Find all beers
app.get('/beers', (req, res) => {
    const arrayJSON = JSON.stringify(beers,null,2);
    res.status(200).send(arrayJSON);
})

// Find beer by id
app.get('/beers/:id', (req, res) => {
    const id = Number(req.params.id);
    const beer = beers.find(b => b.id === id);
    if(beer){
        const beerJSON = JSON.stringify(beer,null,2);
        res.status(200).send(beerJSON);
    }else{
        res.status(404).send(`Could not return beer. Beer not found with id: ${id}`);
    }
})

// Create new beer
app.post("/beers", (req, res) => {
    const resivedBeer = req.body;
    let response = '';
    if(resivedBeer.id)
        response += 'Id assignement is forbidden. Beer id was automatically assigned\n';
    const beer = {id: nextId};
    nextId++;
    for(const p in resivedBeer)
        if(p!='id')
            beer[p] = resivedBeer[p];
    beers.push(beer);
    const beerJson = JSON.stringify(beer,null,2);
    response += `Created beer:\n${beerJson}`;
    res.status(201).send(response);
})

//Updates all properties of one beer by id
app.put('/beers/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = beers.findIndex(b => b.id === id);
    if(index===-1){
        res.status(404).send(`Could not update beer. Beer not found with id: ${id}`);
    }else{
        const oldBeerJSON = JSON.stringify(beers[index],null,2);
        const resivedBeer = req.body;
        let response = '';
        if(resivedBeer.id)
            response += `Id assignement is forbidden. Beer id will reamin: ${id}\n`;
        const beer = {id: id};
        for(const p in resivedBeer)
            if(p!='id')
                beer[p] = resivedBeer[p];
        beers[index] = beer;
        const beerJSON = JSON.stringify(beer,null,2);
        response += `Updated beer.\nBefore update:\n${oldBeerJSON}\nAfter Update:\n${beerJSON}\n`;
        res.status(200).send(response);
    }
})

//Updates some properties of one beer by id
app.patch('/beers/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = beers.findIndex(b => b.id === id);
    if(index===-1){
        res.status(404).send(`Could not update beer. Beer not found with id: ${id}`);
    }else{
        const oldBeerJSON = JSON.stringify(beers[index],null,2);
        const resivedBeer = req.body;
        let response = '';
        if(resivedBeer.id)
            response += `Id assignement is forbidden. Beer id will reamin: ${id}\n`;
        for(const p in resivedBeer)
            if(p!='id')
                beers[index][p] = resivedBeer[p];
        const beerJSON = JSON.stringify(beers[index],null,2);
        response += `Updated beer.\nBefore update:\n${oldBeerJSON}\nAfter Update:\n${beerJSON}\n`;
        res.status(200).send(response);
    }
})

// Delete beer by id
app.delete('/beers/:id', (req, res) => {
    const id = Number(req.params.id);
    const beer = beers.find(b => b.id === id);
    if(beer){
        const beerJSON = JSON.stringify(beer,null,2);
        beers = beers.filter(b => b.id !== id);
        res.status(200).send(`Deleted beer:\n${beerJSON}`);
    }else{
        res.status(404).send(`Could not delete beer. Beer not found with id: ${id}`);
    }
})

app.listen(4444)