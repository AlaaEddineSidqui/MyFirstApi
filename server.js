//Cette ligne importe le module express qui est un 
//framework pour construire des applications web en Node.js.

const express = require('express')

//Cette ligne crée une nouvelle instance de l'application Express 
//en appelant la fonction express() et en la stockant dans la 
//variable app. C'est cette instance qui sera utilisée pour 
//configurer les routes et démarrer le serveur.

const app = express()


//Ce tableau equipes contient des exemples de données d'équipes. 
//Chaque équipe est représentée par un objet avec les propriétés id, name et country.

const equipes = [
    { id: 1, name: "Equipe 1", country: "Country 1" },
    { id: 2, name: "Equipe 2", country: "Country 2" },
    { id: 3, name: "Equipe 3", country: "Country 3" },
]



//Cette ligne définit une route GET pour l'URL '/equipes/success'. 
//Lorsque cette route est appelée, elle envoie une réponse avec le 
//statut 200 (OK) et le texte 'La requete est terminée avec succès'.

app.get('/equipes/success', (req, res) => {
    res.status(200).send('La requete est terminée avec succès')
})


//Cette ligne définit une route GET pour l'URL '/equipes'. Lorsque cette 
//route est appelée, elle renvoie les données des équipes au format JSON.


app.get('/equipes', (req, res) => {
    res.json(equipes)
})


//Cette ligne définit une route GET pour l'URL '/equipes/:id'. 
//Lorsque cette route est appelée avec un ID spécifique, elle recherche 
//l'équipe correspondante dans le tableau equipes en utilisant la méthode find(). 
//Si l'équipe est trouvée, elle est renvoyée en tant que réponse JSON. 
//Sinon, une réponse avec le statut 404 (Not Found) et un message d'erreur est renvoyée.


app.get('/equipes/:id', (req, res) => {
    const { id } = req.params
    const equipe = equipes.find(eq => eq.id === parseInt(id))
    if (equipe) {
        res.json(equipe)
    } else {
        res.status(404).json({ error: "Equipe introuvable" })
    }
})


//Cette ligne ajoute un middleware qui permet de parser les données JSON des 
//requêtes entrantes. Il permet à l'application d'accéder et de traiter les 
//données JSON dans les requêtes.

app.use(express.json())

//Cette ligne définit une route POST pour l'URL '/equipes'. Lorsque cette route 
//est appelée, elle extrait les données de l'équipe à partir du corps de la 
//requête (req.body), crée un nouvel objet d'équipe, l'ajoute au tableau equipes 
//et renvoie une réponse avec le statut 201 (Created) et l'objet d'équipe nouvellement créé au format JSON.

app.post('/equipes', (req, res) => {
    const { id, name, country } = req.body
    const newEquipe = { id, name, country }
    equipes.push(newEquipe)
    res.status(201).json(newEquipe)
})


//Cette ligne définit une route PUT pour l'URL '/equipes/:id'. Lorsque cette route 
//est appelée avec un ID spécifique, elle recherche l'équipe correspondante dans 
//le tableau equipes. Si l'équipe est trouvée, ses propriétés name et country sont 
//mises à jour avec les nouvelles valeurs provenant du corps de la requête (req.body). 
//Ensuite, l'équipe mise à jour est renvoyée en tant que réponse JSON. Si aucune équipe 
//n'est trouvée, une réponse avec le statut 404 (Not Found) et un message d'erreur est renvoyée.


app.put('/equipes/:id', (req, res) => {
    const { id } = req.params
    const { name, country } = req.body
    const equipe = equipes.find(eq => eq.id === parseInt(id))
    if (equipe) {
        equipe.name = name
        equipe.country = country
        res.json(equipe)
    } else {
        res.status(404).json({ error: "Equipe introuvable" })
    }
})


//Cette ligne définit une route DELETE pour l'URL '/equipes/:id'. Lorsque cette route 
//est appelée avec un ID spécifique, elle recherche l'équipe correspondante dans le 
//tableau equipes. Si l'équipe est trouvée, elle est supprimée du tableau à l'aide de 
//la méthode splice(). Ensuite, l'équipe supprimée est renvoyée en tant que réponse JSON. 
//Si aucune équipe n'est trouvée, une réponse avec le statut 404 (Not Found) et un message d'erreur est renvoyée.


app.delete('/equipes/:id', (req, res) => {
    const { id } = req.params
    const index = equipes.findIndex(eq => eq.id === parseInt(id))
    if (index !== -1) {
        const equipeSupp = equipes.splice(index, 1)
        res.json(equipeSupp[0])
    } else {
        res.status(404).json({ error: "Equipe introuvable" })
    }
})


//Cette ligne démarre le serveur Express et le fait écouter les requêtes entrantes sur 
//le port 3000. Lorsque le serveur démarre, un message est affiché dans la console 
//indiquant que le serveur est en cours d'écoute.


app.listen(3000, () => {
    console.log('Serveur Express en cours d\'écoute sur le port 3000')
})