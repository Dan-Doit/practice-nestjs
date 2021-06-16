# EC2 & PM2

### AWS 접속

- 먼저 pem파일과 sh파일을 하나의 폴더안에 집어넣습니다.

  ```shell
  $ ls
  dev-server.sh   server-key.pem  stage-server.sh main.sh
  ```

- 다음 명령어를 실행하여 EC2에 접속을 합니다.

  ```shell
  $ sh energyx-dev-server.sh
  ubuntu@'s password:
  Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-1048-aws x86_64)
  ```

### 현재 브런치 최신화 시키기

- app의 원하는 브런치의 상태를 최신화 시켜줍니다.

  ```shell
  ubuntu@ip:~$ ls
  app  deploy_admin.sh  deploy_client.sh

  ubuntu@ip:~$ cd app

  ubuntu@ip:~/app$ ls
  energyx-api  energyx-api-admin

  ubuntu@ip:~/app$ cd energyx-api

  ubuntu@ip:~/app/energyx-api$ ls

  CHANGELOG.md        CONTRIBUTE.md  README.md  dist                 images  nest-cli.json
  package-lock.json  src   tsconfig.build.json  yarn.lock
  CODE_OF_CONDUCT.md  Dockerfile     build.tar  ecosystem.config.js  logs    node_modules   package.json       test  tsconfig.json

  ubuntu@ip:~/app/energyx-api$ git branch
  * development
    master

  ubuntu@ip:~/app/energyx-api$ git remote -v
  origin	https://gitlab.com/api.git (fetch)
  origin	https://gitlab.com/api.git (push)

  ubuntu@ip:~/app/energyx-api$ git pull origin development
  ```

- pull error 가 생길경우 stash로 변경점을 임시보관하고 다시 pull 받습니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ git merge --quit
  ubuntu@ip:~/app/energyx-api$ git add .
  ubuntu@ip:~/app/energyx-api$ git stash
  Saved working directory and index state WIP on development: 6ace1b3 Merge branch '37-update-project-schema' into 'development'
  ubuntu@ip:~/app/energyx-api$ git pull origin development
  ```

### 프로젝트 빌드시키기

- 성공적으로 소스를 다운 받았다면 모듈또한 새로 설치합니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ npm install
  ```

- 다음은 빌드를 하여 프로덕션을 만듭니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ npm run build
  ```

### PM2로 배포하기

- 다음의 명령어로 배포할수있습니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ npm run deploy:development
  ```

- 다음 명령어로 현재 배포중인 프로젝트를 볼수있습니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ pm2 ls
  ```

- 다음 명령어로 배포중인 프로젝트를 지울수 있습니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ pm2 delete 0
  ```

- 다음 명령어로 배포중인 프로젝트를 저장할수 있습니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ pm2 save
  ```

- 다음 명령어로 배포중인 프로젝트의 상태를 확인합니다.

  ```shell
  ubuntu@ip:~/app/energyx-api$ pm2 log

  ...
  # 7|client_d | [Nest] 473991   - 06/16/2021, 5:29:43 PM   [Bootstrap] Server is listening on port 8001
  ```
