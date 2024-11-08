export const handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
        body: 'Hello, this is a simple Lambda API response!',
    };
    return response;
 };
 