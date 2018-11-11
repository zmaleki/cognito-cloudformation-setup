import * as resource from 'aws-cfn-custom-resource';
import * as AWS from 'aws-sdk';

let cognito = new AWS.CognitoIdentityServiceProvider();
let handleCreate = async (event) => {
    console.log(event);
    let {
        UserPoolId,
        ClientName,
        GenerateSecret,
        RefreshTokenValidity,
        ReadAttributes,
        WriteAttributes,
        ExplicitAuthFlows,
        SupportedIdentityProviders,
        CallbackURLs,
        LogoutURLs,
        DefaultRedirectURI,
        AllowedOAuthFlows,
        AllowedOAuthScopes,
        AllowedOAuthFlowsUserPoolClient,
    } = event.ResourceProperties.UserPoolClient
    try {
        let result = await cognito.createUserPoolClient({
            UserPoolId,
            ClientName,
            GenerateSecret,
            RefreshTokenValidity,
            ReadAttributes,
            WriteAttributes,
            ExplicitAuthFlows,
            SupportedIdentityProviders,
            CallbackURLs,
            LogoutURLs,
            DefaultRedirectURI,
            AllowedOAuthFlows,
            AllowedOAuthScopes,
            AllowedOAuthFlowsUserPoolClient: AllowedOAuthFlowsUserPoolClient == 'true' ? true : false,
        }).promise();
        if (result.UserPoolClient)
            return {
                physicalResourceId: result.UserPoolClient.ClientId
            }
    } catch (error) {
        console.log(error);
    }
}
let handleDelete = async (event) => {
    console.log(event);
    let {
        UserPoolId,
    } = event.ResourceProperties.UserPoolClient
    let ClientId = event.PhysicalResourceId;
    try {
        let result = await cognito.deleteUserPoolClient({
            UserPoolId,
            ClientId
        }).promise();
    }
    catch (error) {
        console.log(error);
    }
}
let handleUpdate = async (event) => {
    console.log(event);
    let {
        UserPoolId,
        ClientName,
        GenerateSecret,
        RefreshTokenValidity,
        ReadAttributes,
        WriteAttributes,
        ExplicitAuthFlows,
        SupportedIdentityProviders,
        CallbackURLs,
        LogoutURLs,
        DefaultRedirectURI,
        AllowedOAuthFlows,
        AllowedOAuthScopes,
        AllowedOAuthFlowsUserPoolClient,
    } = event.ResourceProperties.UserPoolClient

    let ClientId = event.PhysicalResourceId;
    try {
        let result = await cognito.updateUserPoolClient({
            UserPoolId,
            ClientName,
            ClientId: event.PhysicalResourceId,
            RefreshTokenValidity,
            ReadAttributes,
            WriteAttributes,
            ExplicitAuthFlows,
            SupportedIdentityProviders,
            CallbackURLs,
            LogoutURLs,
            DefaultRedirectURI,
            AllowedOAuthFlows,
            AllowedOAuthScopes,
            AllowedOAuthFlowsUserPoolClient: AllowedOAuthFlowsUserPoolClient == 'true' ? true : false,
        }).promise();
        if (result.UserPoolClient)
            return {
                physicalResourceId: result.UserPoolClient.ClientId
            }
    }
    catch (error) {
        console.log(error);
    }
}

exports.handle = resource.handler({
    'Custom::CognitoClient': function () {
        return {
            handleCreate,
            handleDelete,
            handleUpdate
        }
    }
});

export {
    handleCreate,
    handleDelete,
    handleUpdate
}