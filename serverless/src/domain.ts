import * as resource from 'aws-cfn-custom-resource';
import * as AWS from 'aws-sdk';

let cognito = new AWS.CognitoIdentityServiceProvider();

let handleCreate = async (event) => {
    let domainSettings: AWS.CognitoIdentityServiceProvider.CreateUserPoolDomainRequest
        = event.ResourceProperties.UserPoolDomain;

    try {
        let createDomainResult = await cognito.createUserPoolDomain(domainSettings).promise();
        return {
            PhysicalResourceId: domainSettings.Domain
        }
    } catch (error) {
        console.log(error);
    }
}
let handleDelete = async (event) => {
    let domainSettings: AWS.CognitoIdentityServiceProvider.DeleteUserPoolDomainRequest
        = event.ResourceProperties.UserPoolDomain;
    try {
        let createDomainResult = await cognito.deleteUserPoolDomain(domainSettings).promise();
    } catch (error) {
        console.log(error)
    }
}

let handleUpdate = async (event) => {
    let domainSettings: AWS.CognitoIdentityServiceProvider.DeleteUserPoolDomainRequest
        = event.ResourceProperties.UserPoolDomain;
    let { UserPoolId } = domainSettings;
    let { Domain } = event.OldResourceProperties.UserPoolDomain;
    try {
        await cognito.deleteUserPoolDomain({ UserPoolId, Domain }).promise();
        await cognito.createUserPoolDomain(domainSettings).promise();
        return {
            PhysicalResourceId: domainSettings.Domain
        }
    } catch (error) {
        console.log(error)
    }
}

exports.handle = resource.handler({
    'Custom::CognitoDomain': function () {
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