
let preloading = false;

const showPreloader = () => {
    preloading = true;
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';
}

const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    preloading = false;

}


const getData = () => {

    if(!preloading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {
    
                for(let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');
    
                    pId.innerText = `User id: ${user.id}`;
                    pName.innerText = `User name: ${user.name}`;
                    pWebsite.innerText = `User website: ${user.website} <br> ----------`;
    
    
                    document.body.appendChild(pId);
                    document.body.appendChild(pName);
                    document.body.appendChild(pWebsite);
                }
            
                hidePreloader();
            })
    
            .catch(error => {
                console.error(error);
            })

    }
}

const scrollToEndOfThePage =() => {

    let d = document.documentElement;
    let scrollHeight = d.scrollHeight;
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;

    let SumScroll = Math.ceil(scrollTop + clientHeight);

    if(scrollHeight <= SumScroll) {

        getData();

    }
}

window.addEventListener('scroll', scrollToEndOfThePage);