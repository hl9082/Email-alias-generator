import { get } from 'axios';

const getAliases = async (hostEmail) => {
    const authToken = 'mdOJSjd0s9wFqrP'; // Thay bằng auth token của bạn

    try {
        const response = await get(
            `https://mail.zoho.com/api/accounts/${hostEmail}/aliases`,
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`Aliases: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
        console.error(`Failed to get aliases: ${error.response.data}`);
    }
};



// Sử dụng hàm để lấy danh sách alias
getAliases('host@example.com');

