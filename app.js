$(document).ready(function(){ 
    $("#movieForm").submit(function(event){
        console.log("aleksa")
        event.preventDefault()
        
        let naziv = $('#unijeti').val()
        let tip = $('#filmserija').val()
        let godina = $('#godina').val()
        let url="";

        let rezultat="";
        

        if(godina !== 0){
            
            url=`http://www.omdbapi.com/?apikey=693d595&t=${naziv}&type=${tip}&y=${godina}`;
        } else
        {
            url=`http://www.omdbapi.com/?apikey=693d595&t=${naziv}&type=${tip}`;
        }
        console.log(url);
        
        $.ajax({
            method: 'GET',
            url: url,
            success: function(odgovor){
                if(odgovor.Response === "False"){
                    $("#error").html(odgovor.Error);
                    $("#error").show();
                    $("#rezultat").hide();
                    return;
                };
               
                $("#error").hide();

               rezultat=
              ` <table class="table table-striped table-dark mt-5">
              <tr>
                  <td rowspan="10">
                      <img class="img-thumnail mt-4" src="${odgovor.Poster}"/>
                  </td>
              </tr>
              <tr>
                  <td>Naslov:</td>
                  <td>${odgovor.Title}</td>
              </tr>
              <tr>
                  <td>Godina:</td>
                  <td>${odgovor.Year}</td>
              </tr>
              <tr>
                  <td>Datum objavljivanja: </td>
                  <td>${odgovor.Released}</td>
              </tr>
              <tr>
                  <td>Trajanje:</td>
                  <td>${odgovor.Runtime}</td>
              </tr>
              <tr>
                  <td>Reziser:</td>
                  <td>${odgovor.Director}</td>
              </tr>
              <tr>
                  <td>Glumci:</td>
                  <td>${odgovor.Actors}</td>
              </tr>
              <tr>
                  <td>Radnja<br> filma:</td>
                  <td>${odgovor.Plot}</td>
              </tr>`

            if (odgovor.Type=="series")
            { rezultat +=
                `<tr>
            <td>Broj sezona:</td>
            <td>${odgovor.totalSeasons}</td>
            </tr>`}
             
              

                  rezultat += 
                  `
                      <tr>
                      <td>Ocjene gledalaca: </td>
                          <td>
                              <ol>
                  `

                  odgovor.Ratings.forEach(element => {
                      rezultat +=
                      `
                          <li>${element.Source} : ${element.Value}</li>
                      `
                  })

                  rezultat +=
                  `
                              </ol>
                          </td>
                      </tr>
                  </table>
                  `;
                  
                     
                  $("#rezultat").show();
                
            
                $("#rezultat").html(rezultat);
              
            }
           
        })



    });
});

