import * as resource from 'aws-cfn-custom-resource';
import * as AWS from 'aws-sdk';

let cognito = new AWS.CognitoIdentityServiceProvider();

let updateUICustomization = async (event) => {
    let domainSettings: AWS.CognitoIdentityServiceProvider.SetUICustomizationRequest
        = event.ResourceProperties.CustomUISettings;

    try {
        if (domainSettings.ImageFile) {
            domainSettings.ImageFile = new Buffer(domainSettings.ImageFile.toString().replace(/^data:image\/\w+;base64,/, ""), 'base64');
        }
        let createDomainResult = await cognito.setUICustomization(domainSettings).promise();
        console.log(createDomainResult);
    } catch (error) {
        console.log(error);
    }
}

let handleCreate = updateUICustomization;
let handleUpdate = updateUICustomization;
let handleDelete = async (event) => {
}

exports.handle = resource.handler({
    'Custom::CognitoCustomUI': function () {
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