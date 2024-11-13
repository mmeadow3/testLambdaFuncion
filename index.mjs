import axios from 'axios'; // This should be at the top of your Lambda function
const SALESFORCE_LOGIN_URL = process.env.SALESFORCE_LOGIN_URL // Use 'test.salesforce.com' for sandbox
const CLIENT_ID = process.env.CLIENT_ID // Consumer Key from Salesforce Connected App
const CLIENT_SECRET = process.env.CLIENT_SECRET // Consumer Secret from Salesforce Connected App
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const SECURITY_TOKEN = process.env.SECURITY_TOKEN;



///// this is to Test local
/// Can also test via Postman > Salesforce Platform APIs > Auth > Username Password Flow

// (async () => {
//     const authRequestData = new URLSearchParams({
//         grant_type: 'password',
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         username: USERNAME, // <-- here
//         password: PASSWORd + SECURITY_TOKEN
//       });


//     try {
//       const data = await axios.post('https://login.salesforce.com/services/oauth2/token', authRequestData, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       })
//       console.log("Data:", data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();

///// The entire issue here was that setting:  Allow OAuth Username-Password Flows is disabled by default and must be turned on
//// go to Setup -> OAuth and OpenID Connect Settings and turn it on 


export const handler = async (event) => {
    try {
        // Step 1: Obtain Salesforce Access Token using OAuth 2.0
        const authRequestData = new URLSearchParams({
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            username: USERNAME, // <-- here
            password: `${PASSWORD}${SECURITY_TOKEN}` // <-- here in my case, I didn't need a security token
          });

        console.log('getting Token!!!! ')

        const response = await axios.post('https://login.salesforce.com/services/oauth2/token', authRequestData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          
        console.log(response);
        console.log(response.data);
        console.log(response.data.access_token);

          
    ////// Had to add cloudwatch:GenerateQuery to policy in order to view Cloudwatch Logs
        const accessToken = response.data.access_token;
        const instanceUrl = response.data.instance_url;

        // Step 2: Make a POST request to create a new Account in Salesforce
        const accountData = {
            Name: 'New Account from Lambda',
            Type: 'Prospect',
        };

        const createAccountResponse = await axios.post(
            `${instanceUrl}/services/data/v54.0/sobjects/Account/`, 
            accountData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Step 3: Return success message
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Account created successfully!',
                accountId: createAccountResponse.data.id,
            }),
        };
    } catch (error) {
        // Handle errors
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error creating account in Salesforce',
                error: error.message,
            }),
        };
    }
};
