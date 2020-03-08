# RA2™ Serverless

## ra2-serverless full stack with ci/cd

### SaaS Starter Kit with React AWS Amplify

#### see live demo

development: https://ra2-dev.sonabstudios.com/ <br />

test account: <br />
email: 'dev@sonabstudios.com' <br />
password: 'Ra2-1234' <br />

![Preview](public/ci_cd_pipeline.jpg)

# Features V1.0

### Landing Page

- [x] random wallpaper/images from unsplash.com. Refer to API at https://unsplash.com/developers

### Auth module

- [x] signin with google
- [x] signin with facebook
- [x] signin with email
  - [x] signup with email
  - [x] signup confirmation
  - [x] reset password
- [x] aws hosted sign in (hidden)
- [x] signout

# Planned Features

- [x] Version 1.0 : Authentication (email, google, facebook)
- [ ] Version 1.1 : User Profiles
- [ ] Version 1.2 : Multi-Factor Authentication
- [ ] Version 2.0 : Dynamic Themes (Light, Dark, Custom)
- [ ] Version 3.0 : Payment Integration (Paypal)

## Tech Stack

- TypeScript
- React (+ Hooks and Router)
- AWS Amplify
- Material-UI
- Unit Tests with Jest + Enzyme
- Functional Tests with Cypress
- CI/CD with Amplify Console

## Deploy with the AWS Amplify Console

The AWS Amplify Console provides hosting for fullstack serverless web apps. [Learn more](https://console.amplify.aws). Deploy this app to your AWS account with a single click:

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/aws-samples/create-react-app-auth-amplify)

The Amplify Console will fork this repo in your GitHub account, and then build and deploy your backend and frontend in a single workflow. Your app will be available at `https://master.appid.amplifyapp.com`.

References: <br />
https://aws-amplify.github.io/docs/cli-toolchain/quickstart<br />
https://aws-amplify.github.io/docs/<br />

## Run locally with the Amplify CLI

Pre-requisites: <br />

1. Sign of for an AWS Account and nstall Amplify CLI <br />

```
npm install -g @aws-amplify/cli
$ amplify configure
```

2. Clone the repo that was just forked in your account

```
git clone git@github.com:<username>/ra2-serverless.git

cd ra2-serverless && npm install
```

3. Import the backend environment deployed by the Amplify Console to your repo (the `amplify/team-provider.json` file contains information on all backend environments in your AWS account). The GIF below shows how you to copy the `amplify env import` command from the Amplify Console.

![Preview](public/import-backend.gif)

4. Paste this command into your terminal at the root of your repo. You should see the `amplify/team-provider.json` updated with a backend named `amplify`.

```
amplify env import --name master --config "{<stack>}" --awsInfo "{<profile>}" --yes

Successfully added environment from your project
```

5. Initialize the Amplify CLI with the `amplify` environment.

```
amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: (Use arrow keys)
> master
```

6. Create environment variables
   a. create .env file in the root folder and add your facebook and/or google app client ids.
   REACT_APP_FACEBOOK_CLIENT_ID='<your_facebook_client_id>' <br />
   REACT_APP_GOOGLE_CLIENT_ID='<your_google_client_id>' <br />
   b. Add the same environment you AWS Amplify console <br />

7) Run locally

```
npm start
```

#### Pull Requests are welcome!

contact me
email: dev@sonabstudios.com <br />
website: https://www.sonabstudios.com/<br />
