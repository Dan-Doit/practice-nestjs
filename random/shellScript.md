# postgres cof 파일 찾기

```sql
$ find / -name pg_hba.conf

# /var/lib/postgresql/data/pg_hba.conf
```

# vim 설치하기

```sql
# devian 에서는 vim을 사용합니다.
$ apt update
$ apt install vim
```

# set 사용하기

```javascript
// 중복값 제거시에는 set 형식을 사용하면된디.
const animals = ['🐱', '🐹', '🦊', '🐻', '🐶', '🐶', '🦊'];
const newAnimals = [...new set(animals)];
console.log(newAnimals);

// '🐱', '🐹', '🦊', '🐻', '🐶'
```
