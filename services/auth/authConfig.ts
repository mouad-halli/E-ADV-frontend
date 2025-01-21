
export const AzureAdConfig = {
    issuer: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID}/v2.0`,
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID as string,
    redirectUrl: process.env.EXPO_PUBLIC_REDIRECT_URL as string,
    scopes: ['openid', 'profile', 'email'],
    // serviceConfiguration: {
    //     authorizationEndpoint: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID}/oauth2/v2.0/authorize`,
    //     tokenEndpoint: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID}/oauth2/v2.0/token`,
    //     revocationEndpoint: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID}/oauth2/v2.0/logout`
    // }
}