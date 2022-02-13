export class MockDataSource {
    private url: string;

    constructor(url = 'https://jsonplaceholder.typicode.com/photos') {
        this.url = url;
    }

    fetch() {
        return fetch(this.url, {
            method: 'GET'
        }).then(res =>
            res.json().then(response => {
                return response;
            })
        )
            .catch(err => ({
                error: err
            }));
    }
}
