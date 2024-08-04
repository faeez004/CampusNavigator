//let url="http://universities.hipolabs.com/search?country=";

let btn=document.querySelector('button');
btn.addEventListener('click',async ()=>{
    let country=document.querySelector('#country').value;
    let state=document.querySelector('#state').value;
    let name=document.querySelector('#name').value;
    clearResults();
    getColleges(name,country,state);
})

async function getColleges(name,country,state){
    let url;
    if(name){
        url="http://universities.hipolabs.com/search?country="+country+"&name="+name;
    }
    else
    {
        url="http://universities.hipolabs.com/search?country="+country;
    }
     
    let res= await axios.get(url);
    let colleges=res.data;

    

    let count=0;
    
    if(state)
    {
        colleges=colleges.filter(college =>
            college['state-province']&&
            college['state-province'].toLowerCase() === state.toLowerCase()
        );
    }
    if(colleges.length==0)
    {
        let noclg=document.createElement('p');
        noclg.innerText="No college found with given input/filter";
        let responseArea=document.querySelector('.responses');
        responseArea.appendChild(noclg);
    }
    else
    {
        let responseArea=document.querySelector('.responses');
        let results=document.createElement('p');
        results.innerText=colleges.length+" result(s) found";
        responseArea.appendChild(results);
        for(dat of colleges)
            {
                console.log(++count);
                let line=document.createElement('hr');
                responseArea.appendChild(line);
                let nm=document.createElement('p');
                nm.innerText=count +". "+dat.name;
                responseArea.appendChild(nm);
                
                
                if (dat['state-province'] && dat['state-province'].trim() !== '') {
                    let st = document.createElement('p');
                    st.innerText = "State : " + dat['state-province'];
                    responseArea.appendChild(st);
                }
                   
                
                let wb=document.createElement('a');
                wb.innerText="Website : "+dat.web_pages;
                responseArea.appendChild(wb);
                let visit=document.createElement('button');
                visit.innerText="Visit website";
                wb.append(visit);
                visit.style.marginLeft='2rem';
                let website=dat.web_pages;
                visit.addEventListener('click',()=>{
                    window.open(website, '_blank');
                })
                console.log("Name : "+dat.name);
                console.log("Country : "+dat.country);
                console.log("State : "+dat['state-province']);
                console.log("Website : "+dat.web_pages);
            }
    }
   
}
function clearResults()
{
    let responseArea=document.querySelector('.responses');
    while(responseArea.firstChild)
    {
        responseArea.removeChild(responseArea.firstChild);
}
}