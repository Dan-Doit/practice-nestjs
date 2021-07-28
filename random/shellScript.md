# shell script

```bash
#!/bin/sh

## 파라미터가 없으면 종료
if [ "$#" -lt 1 ]; then
    echo "$# is Illegal number of parameters."
    echo "Usage: $0 [options]"
	exit 1
fi
args=("$@")

## for loop 를 파라미터 갯수만큼 돌리기 위해 three-parameter loop control 사용
for (( c=0; c<$#; c++ ))
do
    echo "$c th parameter = ${args[$c]}";
done
```

# 쉘 스크립트로 오토컴플리션 만들기
