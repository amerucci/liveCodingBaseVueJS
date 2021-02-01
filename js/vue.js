new Vue({
    el: "#todolist",
    data: {
        tache: "",
        taches: [],
        tachesRealisee:0,
        firstutils:false,
        nbTaches:0
       
    },
  

    mounted() {
        //On récupère ce qu'il y a déjà dans le localStorage pour l'injecter dans notre tableau taches
        if (localStorage.getItem('tableauDesTaches'))
            this.taches = JSON.parse(localStorage.getItem('tableauDesTaches'));

            if (localStorage.getItem('tachesrealisees'))
            this.tachesRealisee = JSON.parse(localStorage.getItem('tachesrealisees'));

           
            this.nbTaches=this.taches.length    

            if(this.nbTaches==0)
            this.firstutils=true
               
            
         
        
           
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
            this.nbretache()
            this.firstutils=false
            
        },
        //On supprime l'élement sur lequel on a cliqué grâce à la récupération de l'index
        supprimerTache(queltache) {
            this.taches.splice(queltache, 1)
            // On met à jour le localStorage
            localStorage.setItem('tableauDesTaches', JSON.stringify(this.taches))
            this.tachesRealisee -= 1
            this.nbTaches -= 1
            localStorage.setItem('tachesrealisees', JSON.stringify(this.tachesRealisee ))
            this.firstutils=false
        },

        cestFait(queltache, titredelatache) {
            //On va cibler la tache sur laquelle on a cliqué
            latache = document.getElementsByClassName('tache')[queltache]
            latache.classList.toggle('fait')
                        this.taches.splice(queltache, 1, {
                tache: titredelatache,
                class: 'fait',
                tachesRealisee : this.tachesRealisee
            })
            localStorage.setItem('tableauDesTaches', JSON.stringify(this.taches))
            this.tachesRealisee += 1
            localStorage.setItem('tachesrealisees', JSON.stringify(this.tachesRealisee ))
            this.nbretache()
            this.firstutils=false

        }, 
        //On va calculer le nombre réel de taches a effectuer en se basant sur le clic du bouton fait
        nbretache(){
            
            this.nbTaches=this.taches.length
        }
       
        
    }
})