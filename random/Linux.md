# 리눅스 명령어에 대한 설명과 예시

## [man] 리눅스에서 명령어 정보를 얻을수 있다.

- 리눅스에서 모르는 명령어의 정보를 얻어야 할경우 man을 사용합니다.

```bash
$ man [명령어]
```

## [ls] 현재 보이는 디렉토리의 명을 찾아볼수있다.

- ls 는 보이는 디렉토리의 여러가지 옵션을 주어 어떤 파일이 들어있는지 더욱 자세히 확인할수 있습니다. (alh는 자세하고 사이즈를 사람이 보기 편하게 보여줍니다.)

```bash
$ ls -alh
```

## [ps] 현재 시스템에서 실행중인 프로세스 시각화

- ps는 현재 실행중인 프로세스를 시각화 해줍니다. 시스템 리소스 분석에 매우 효과적입니다.

```bash
$ ps -efc
```

- ps 는 도커에서도 똑같이 사용이 가능합니다.

```bash
$ docker ps -a
$ docker ps -l
```

## [kill] 프로세스종료

- kill 은 ps와 자주 사용되며 프로세스를 종료할때 사용합니다. (-9, -15) 옵션이 있는데 각각 강제종료, 종료입니다.

```bash
$ kill -9 PID번호
```

## [grep] 원하는 문자 잡아오기

- 그립은 보통 파이프 라인과 자주 사용하며 원하는 문자만 골라오거나 잡아올수 있습니다.

```bash
cat [file name] | grep [word]

ex)

# grep "^문자열"       = 문자열로 행이 시작되는 경우 출력

# grep "문자열&"       = 문자열로 행이 끝나는 경우 출력

# grep "문자1\|문자2" = 여러 문자열을 한번에 검색

# grep -A2 "문자열"    = 해당 문자열이 들어강 행을 포함해 아래 2행 출력

# grep -v "문자열"      = 해당 문자를 제외한 행 출력

# grep "문자열" *       = 현재 위치의 모든파일 (*)에서 특정 문자열 출력


```

## 파일에서 스크립트 실행 .sh

- sh 파일에서 우리는 배쉬명령을 사용할수있는데 아래와 같이 #!/bin/bash 문구를 입력해주면된다.

```bash

#!/bin/bash

hello="hello"
world="world"

echo $hello
echo ${hello}

echo $hello", "$world
echo ${hello}", "${world}
```

## IF문

- 마찬가지로 IF문등을 사용할수있다.

```bash
val="hello"

if [ $val == "hello" ];then
  echo "hello"
elif [ $val == "hi" ]; then
  echo "hi"
else
  echo "else"
fi
```

## FOR문

- 마찬가지로 FOR문을 사용할수있다.

```bash
for (( c=1; c<=5; c++ ))
do
  echo "value : $c"
done

또는

for val in {1..5}
do
  echo ${val}
done
```

## 함수문

- 마찬가지로 IF문등을 사용할수있다.

```bash
test_func() {
  echo "hello, world"
  echo $1
}

test_func "test"
```

## AWS리눅스 접속방법

```bash
ssh "key.pem" -i ubuntu@[ip]
```

## MAC에서 모바일 작업시 와치 오류

```bash
brew install watchman
```

## 리눅스 Cron

# 스크립트 함수로 알리아스 만들기

```bash
clientoff() {
    sudo kill -9 $(sudo lsof -i :3000 | grep LISTEN | awk ${print $2})
}
```

# 포트 관련 스크립트

```bash
alias loip="ipconfig getifaddr en0"
alias myip="curl http://ipecho.net/plain; echo"
alias allport="sudo lsof -PiTCP -sTCP:LISTEN"
```

# 백그라운드로 프로그램 실행하기
```bash
# 백그라운드에서 서버 실행
$ nohup python3 -u /home/ubuntu/app/public-project-api/server.py &

# 로그 보기 
$ tail -f nohup.out 

# 실행 종료
$ ps -ef | grep server.py
$ kill -9 <PID>
```

# 크론탭 사용하기
```bash
# 크론탭을 설정
$ crontab -e

# 크론탭 내용 확인
$ crontab -l

리눅스 쉘에 다음처럼 입력합니다.
# 크론탭 삭제
$ crontab -r

# 크론탭 사용 방법
#     *　　　　　　*　　　　　　*　　　　　　*　　　　　　*
# 분(0-59)　　시간(0-23)　　일(1-31)　　월(1-12)　　　요일(0-7)
$ * * * * * ls -al

# 매분 test.sh 실행
$ * * * * * /home/test.sh

# 매주 금요일 오전 5시 45분에 test.sh 를 실행
$ 45 5 * * 5 /home/test.sh

# 크론 로깅
$ * * * * * /home/test.sh > /home/test.sh.log 2>&1
```
