new Vue({
    el: "#todolist",
    data: {
        tache: "",
        taches: [],
    },
    mounted() {
        //On récupère ce qu'il y a déjà dans le localStorage pour l'injecter dans notre tableau taches
        if (localStorage.getItem('tableauDesTaches'))
            this.taches = JSON.parse(localStorage.getItem('tableauDesTaches'));
    },
    methods: {
        ajouterTache() {
            if (this.tache != "")
                // On ajoute la valeur au tableau Taches
                this.taches.push({
                    tache: this.tache
                })
            //On sauvegarde notre tableau des taches dans le local storage
            localStorage.setItem('tableauDesTaches', JSON.stringify(this.taches))
            this.tache = ""
        },
        //On supprime l'élement sur lequel on a cliqué grâce à la récupération de l'index
        supprimerTache(queltache) {
            this.taches.splice(queltache, 1)
            // On met à jour le localStorage
            localStorage.setItem('tableauDesTaches', JSON.stringify(this.taches))
        },
        cestFait(queltache, titredelatache) {
            //On va cibler la tache sur laquelle on a cliqué
            latache = document.getElementsByClassName('tache')[queltache]
            latache.classList.toggle('fait')
            this.taches.splice(queltache, 1, {
                tache: titredelatache,
                class: 'fait'
            })
            localStorage.setItem('tableauDesTaches', JSON.stringify(this.taches))

        }
    }
})