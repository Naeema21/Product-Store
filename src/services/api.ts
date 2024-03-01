
const BASE_URL = 'https://fakestoreapi.com/';

interface ServiceOptions {
    endpoint: string;
    data?: object;
    method?: 'GET' | 'POST';
}

const services = async ({ endpoint, data, method = 'GET' }: ServiceOptions) => {
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers as needed
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        fetch(url)
            .then(res => res.json())
            .then(json => console.log(json)
            )
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default services;
