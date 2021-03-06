const baseURL = "https://api.github.com";

export const getProfileApi = (userName) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseURL}/users/${userName}`)
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject('Something went wrong');
                }
            })
    })
}

export const getReposApi = (userName, {searchTerm='', type='fork:true', language='all'}) => {
    
    const term = searchTerm && searchTerm.length ? `${searchTerm}+` : '';
    let repoType = `+${type}`;
    return new Promise((resolve, reject) => {
        fetch(`${baseURL}/search/repositories?q=${term}user:${userName}+language:${language}${repoType}&sort=stars&order=desc&page=1&per_page=100`)
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject('Something went wrong');
                }
            })
    })
}
