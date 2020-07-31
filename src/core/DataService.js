import axios from 'axios';

const endpoint = 'http://survey-system.thomasbowlin.com/graphql/';

export const dataCall = (call, variables = {}) => {
    return axios({
        url: endpoint,
        method: 'POST',
        data: {
            query: call,
            variables
        }
    });
}