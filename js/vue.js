new Vue({
    el: "#todolist",
    data: {
        tache: "",
        taches: [],
        tachesRealisee:0,
        firstutils:false,
        nbTaches:0,
        datedujour: "",
        nbclick:"",
        isEditing:false
       
    },
    created() {
        this.getNow()
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
    computed: {
        buttonMessage: function () {
          switch (this.docState) {
            case 'saved': return 'Modifier'
            case 'edited': return 'Sauver'
            case 'editing': return 'Annuler'
          }
        }
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
        },

        getNow() {

            const monthNames = ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juill.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];

            const d = new Date();
            var dd = String(d.getDate()).padStart(2, '0');
            var mm = String(d.getMonth() + 1).padStart(2, '0');
            var yyyy = d.getFullYear();
            var fullDate = +dd +" " + monthNames[d.getMonth()] +" "+ yyyy;
         

            this.datedujour = fullDate;
        },

        



       
        
    }
})