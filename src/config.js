const config = {
    s3: {
      REGION: "eu-west-2",
      BUCKET: "notes-dev-serverlessdeploymentbucket-15bims7zoecyy",
    },
    apiGateway: {
      REGION: "eu-west-2",
      URL: "https://kzm9loguy5.execute-api.eu-west-2.amazonaws.com/dev",
    },
    cognito: {
      REGION: "eu-west-2",
      USER_POOL_ID: "eu-west-2_pZCn7ppDZ",
      APP_CLIENT_ID: "2d2k6mvl0f8ouv5s8ljf9s0pr0",
      IDENTITY_POOL_ID: "eu-west-2:9bad05c0-92d3-4393-9632-9c11f143dfc0",
    },
  };
  
  export default config;