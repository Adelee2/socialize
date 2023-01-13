[![CircleCI](https://circleci.com/gh/Adelee2/socialize.svg?style=svg)](https://circleci.com/gh/Adelee2/socialize)

```<b> Features of this app </b>```

1 video calling friends 
2 chatting
3 post videosor pictures, likes, comments(based on if the owner wants it)
4 add friends
5 Feeds for everybody can like and comment


`Tools`
* Mongodb
* firebase
* docker
* circleci
* express and ejs

### Running `app`

1. Standalone:  `npm start`. App runs locally at http://127.0.0.1:3000
2. Run in Docker:  `./run_docker.sh`

### Deploying
<b> Steps </b>
1. must have an AWS account
2. must have a circleci account
3 connect the project to circleci
4. add the environment variables `AWS_REPOSITORY_URL`, `REPOSITORY_NAME` and `AWS_DEFAULT_REGION` to circleci
5. run the cloudformation template file in `.circleci/eksserver_setup/server.yml` to setup VPCs and Subnets for kubernetes
6. update the `.circleci/eksserver_setup/cluster.yml` file with the result gotten in 5. 
7. Once the deployment is done, app runs at `http://<LoadBalancer External-IP>`