// Look into CORS policy and find fix

window.onload = yelp();

function yelp() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer qrnFF_krm4u_WK6q5nlQnLT53aUn3y4MaVfT4SQ69eyU3Y6dS4jU8B6ocT9tXV91bWUy5v7QIWhDdcx-KhXKcAeaebHR08in3Oehh3stAQ9LcIvfe4-vZSiHX5svZXYx'
        }
    };

    fetch('https://api.yelp.com/v3/businesses/search?latitude=-87.6521&longitude=41.8482&radius=30000&sort_by=best_match&limit=20', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}