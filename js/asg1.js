var map;

function initMap() {
    map = new google.maps.Map(document.querySelector(".d"), {
    center: {lat: 0, lng: 0},
    mapTypeId: 'satellite',
    zoom: 18
});
} 

document.addEventListener("DOMContentLoaded", function() { 
    
    const galleryAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';
    const paintingAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/paintings.php?gallery=';
    document.querySelector("#loader1").style.display = "block";
    document.querySelector("#loader2").style.display = "block";
    document.querySelector(".f").style.display = "none";


fetch(galleryAPI).then(function (resp) { return resp.json(); }).then (function(data) { listGallery(data); clickData(data);}).catch(function(error) { console.error(error) });
    


function listGallery(e) {
        for (let i of e){
        var listElement = document.createElement("li");
        listElement.textContent = i.GalleryName;
        document.querySelector("#galleryList").appendChild(listElement);           
        }
            
 document.querySelector("#loader1").style.display = "none"; 
    
    visible("galleryList");
        } 
    
 function listPainting(x) {
     for (let i of x){
         let filename = i.ImageFileName
    let imagelink = "https://res.cloudinary.com/funwebdev/image/upload/w_75/art/paintings/square/" + filename;
         var imgElement = document.createElement("img");
         imgElement.src = imagelink;
         imgElement.id = i.Title;
        let table = document.querySelector("#paintingTable").insertRow(0);
        
         var yearElement = document.createElement("p");
         yearElement.textContent = i.YearOfWork;
         let year = table.insertCell(0);
         year.appendChild(yearElement);
         
         var titleElement = document.createElement("p");
         titleElement.textContent = i.Title;
         let title = table.insertCell(0);
         title.appendChild(titleElement);
         
         var lastElement = document.createElement("p");
         lastElement.textContent = i.LastName;
         let last = table.insertCell(0);
         last.appendChild(lastElement);
         
         let paint = table.insertCell(0);
        paint.appendChild(imgElement);
        }
         
    }
 
function editor(e) {
    for (let i of document.querySelectorAll("td:nth-child(3)")){
        i.addEventListener('click', (x) => {
     document.querySelector(".b").style.display = "none"
    document.querySelector(".c").style.display = "none"
    document.querySelector(".d").style.display = "none"
    document.querySelector(".e").style.display = "none"
        document.querySelector(".f").style.display = "block";
            
            
        
        let id = e.find(e => e.Title == x.target.textContent);
        let filename = id.ImageFileName
        let imagelink = "https://res.cloudinary.com/funwebdev/image/upload/w_400/art/paintings/square/" + filename;
        
        var imgElement = document.createElement("img");
         imgElement.src = imagelink;
         imgElement.id = id.Title;
        document.querySelector("#single section").appendChild(imgElement);
        document.querySelector("#single h1").textContent = id.Title;
            document.querySelector("#a").textContent = id.FirstName + " " + id.LastName;
            document.querySelector("#b").textContent = id.YearOfWork + ", " + id.Medium + ", " + id.Width + ", " + id.Height + ", " + id.CopyrightText + ", " + id.GalleryName + ", " + id.GalleryCity + ", " + id.Description;
            document.querySelector("#c").textContent = id.MuseumLink;
            document.querySelector("#c").href = id.MuseumLink;
            for (let x of id.JsonAnnotations.dominantColors)
                {
                    let span = document.createElement("span");
                    let hex = x.web;
                    span.id = "tooltip";
                    let label = document.createElement("label");
                    label.class = "tooltiptext";
                    label.textContent = hex + " " + x.name;
                    label.style.display = "none";
                    span.style.backgroundColor = hex;
                    span.style.display = "inline-block";
                    span.style.margin = "5px";
                    span.style.width = "20px";
                    span.style.height = "20px";
                    span.title = x.name + " " + hex;
                    span.appendChild(label);
                    document.querySelector("#single section").appendChild(span);
                    
                }
            
            imgElement.addEventListener('click', (x) => {
                
        let bigLink = "https://res.cloudinary.com/funwebdev/image/upload/w_1000/art/paintings/square/" + filename;
        var bigImg = document.querySelector(".modal-content img");
         bigImg.src = bigLink;
         bigImg.id = id.Title;
                document.querySelector(".modal-content").appendChild(bigImg);
                var modal = document.getElementById("Modal")
                modal.style.display = "block";

                })
            
            document.querySelector(".close").addEventListener('click', (x) => {
                var modal = document.getElementById("Modal")
                modal.style.display = "none";


            })
            
  

            
            document.querySelector("#myBtn").addEventListener('click', (x) => {
                
                document.querySelector(".b").style.display = "block"
    document.querySelector(".c").style.display = "block"
    document.querySelector(".d").style.display = "block"
    document.querySelector(".e").style.display = "block"
        document.querySelector(".f").style.display = "none";
                document.querySelector(".f img").remove();
               document.querySelector("#tooltip").remove();
               document.querySelector("#tooltip").remove();
                document.querySelector("#tooltip").remove();
                document.querySelector("#tooltip").remove();
                document.querySelector("#tooltip").remove();
                document.querySelector("#tooltip").remove();
                
                })
        })
    }
}
    
function visible(id) {
  document.querySelector("#exit").addEventListener('click', (x) => {
    
    let info = document.getElementById(id);
    if (info.style.display === "none"){
        info.style.display = "block";
        document.querySelector(".b").style.height = "850px";
}
    else
      {  info.style.display = "none";
       document.querySelector(".b").style.height = "300px";
      }

  })
}
    
    function clickData(e) {
        document.querySelector("#loader2").style.display = "block";

        for (let i of document.querySelectorAll("#galleryList")) {
            i.addEventListener('click', (x) => {
            let id = e.find(e => e.GalleryName == x.target.textContent);
            document.querySelector("#galleryName").textContent = id.GalleryName;
            document.querySelector("#galleryNative").textContent = id.GalleryNativeName;
            document.querySelector("#galleryCity").textContent = id.GalleryCity;
            document.querySelector("#galleryAddress").textContent = id.GalleryAddress;
            document.querySelector("#galleryCountry").textContent = id.GalleryCountry;
            document.querySelector("#galleryHome").textContent = id.GalleryWebSite;
            document.querySelector("#galleryHome").href = id.GalleryWebSite;
            map.setCenter({lat: id.Latitude, lng: id.Longitude});
            let galleryID = id.GalleryID;
            document.querySelector("#paintingTable").textContent = "";
                document.querySelector("#paintingTable").style.display = "block";
            fetch(paintingAPI + galleryID).then(function (resp) { return resp.json(); }).then (function(data) { listPainting(data); sort(); editor(data); }).catch(function(error) { console.error(error) });
        })
            
        } 
        document.querySelector("#loader2").style.display = "none";
    }
    
    function sort() {
        /* https://www.tutorialspoint.com/how-to-sort-an-html-table-using-javascript
        Used for help with sorting
        */
        document.querySelector("#artist").addEventListener('click', (x) => {
      var filterTable, rows, sorted, i, x, y, sortFlag;
      filterTable = document.querySelector("#paintingTable");
      sorted = true;
      while (sorted) {
         sorted = false;
         rows = filterTable.rows;
         for (i = 0; i < rows.length; i++) {
            sortFlag = false;
            x = rows[i].getElementsByTagName("td")[1];
            y = rows[i + 1].getElementsByTagName("td")[1];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
               sortFlag = true;
               break;
            }
         }
         if (sortFlag) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            sorted = true;
         }
      }
   
  
         
        })
        document.querySelector("#title").addEventListener('click', (x) => {
            var filterTable, rows, sorted, i, x, y, sortFlag;
      filterTable = document.querySelector("#paintingTable");
      sorted = true;
      while (sorted) {
         sorted = false;
         rows = filterTable.rows;
         for (i = 0; i < rows.length; i++) {
            sortFlag = false;
            x = rows[i].getElementsByTagName("td")[2];
            y = rows[i + 1].getElementsByTagName("td")[2];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
               sortFlag = true;
               break;
            }
         }
         if (sortFlag) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            sorted = true;
         }
      }
            
        })
        document.querySelector("#year").addEventListener('click', (x) => {
            var filterTable, rows, sorted, i, x, y, sortFlag;
      filterTable = document.querySelector("#paintingTable");
      sorted = true;
      while (sorted) {
         sorted = false;
         rows = filterTable.rows;
         for (i = 0; i < rows.length; i++) {
            sortFlag = false;
            x = rows[i].getElementsByTagName("td")[3];
            y = rows[i + 1].getElementsByTagName("td")[3];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
               sortFlag = true;
               break;
            }
         }
         if (sortFlag) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            sorted = true;
         }
      }
            
        })
    }
    
})