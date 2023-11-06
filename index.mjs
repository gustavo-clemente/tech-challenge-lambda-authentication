
import  DatabaseClient  from './src/databaseClient.js';
import TokenGenerator  from './src/tokenGenerator.js';

export const handler = async (event, context, callback) => {

    const dbClient = new DatabaseClient();
    const tokenGenerator = new TokenGenerator();

    const body = event.body ?? {}

    if (!body.hasOwnProperty("documento")) {
        const response = {
            'msg': 'Documento não foi específicado'
        }
        callback(null, createAPIGatewayResponse(400, response))
    }


    try {

        await dbClient.connect();
        const customerData = await dbClient.queryCustomerByDocument(body.document);

        if (customerData && customerData.length > 0) {
            const response = {
                'token': token = tokenGenerator.generateToken({ customerId: customerData[0].id })
            }
            callback(null,createAPIGatewayResponse(200, response))
        }

        const response = {
            'msg': 'Cliente não localizado'
        }
        callback(null, createAPIGatewayResponse(401, response))

    } catch (error) {
        const response = {
            'msg': 'Ocorreu um erro ao realizar a autenticação'
        }

        callback(null, createAPIGatewayResponse(500, response))
    }

};

function createAPIGatewayResponse(statusCode, responseBody) {
    const response = {
        "headers": {
            "Content-type": "application/json"
        },
        "statusCode": statusCode,
        "body": JSON.stringify(responseBody)
    }

    return response
}

