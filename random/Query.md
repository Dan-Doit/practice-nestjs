# 사용한 쿼리중에 중요하거나 어려웠던 부분을 저장합니다.

## 카운트 사용법

```sql
select
      (select COUNT(CASE WHEN message.status NOT IN ('APPROVAL','TEMPORARY') THEN 1 END) confirm_progress_count
      from message
      where message.member_id = 3 and type = 'MASTER' and action = 'PROJECT'),
      COUNT(CASE WHEN project.status IN ('CREATED','SELECTED_ESTIMATE','CLOSE_BID') THEN 1 END) estimate_progress_count,
      COUNT(CASE WHEN project.status = 'ING' THEN 1 END) business_progress_count,
      COUNT(CASE WHEN project.status = 'END' THEN 1 END) complete_progress_count
      from project
      where project.master_id = 3;
```

## 유니온과 카운트 응용

```sql
select
      (select count(project.id) from project
        where project.status = 'CREATED'
        and project.id not in (
          select estimate.project_id from estimate
          left join epc on estimate.epc_id = epc.id
          left join partner on epc.id = partner.epc_id
          left join member on member.partner_id = partner.id
          where member.id = ${memberId})
      ) as available_for_project_count,
      COUNT(CASE WHEN result.status NOT IN ('ING','END') THEN 1 END) bidding_in_progress_count,
      COUNT(CASE WHEN result.status = 'ING' AND result.plant_type = 'SOLAR_HOUSE' THEN 1 END) developing_in_progress_HOUSE_count,
      COUNT(CASE WHEN result.status = 'ING' AND result.plant_type = 'SOLAR_BUILDING' THEN 1 END) developing_in_progress_BUILDING_count,
      COUNT(CASE WHEN result.status = 'ING' AND result.plant_type = 'SOLAR_LAND' THEN 1 END) developing_in_progress_LAND_count
  from
  (select project_id,project.* from estimate
      inner join project on estimate.project_id = project.id
  where estimate.epc_id = ${epcId}
  union all
  select project_id,project.* from negative_opinion
      inner join project on negative_opinion.project_id = project.id
  where negative_opinion.epc_id = ${epcId}) result;5
```

## postresql 카운트 응용문

```sql
select
    project.id
    from project
    left join estimate on estimate.project_id = project.id
    left join epc on estimate.epc_id = epc.id
    left join partner on epc.id = partner.epc_id
    left join member on member.partner_id = partner.id
    left join negative_opinion no on epc.id = no.epc_id
    where epc.id = 1 and project.status NOT IN ('ING')
    group by project.id
    order by project.id ASC;
```

## postgresql 타임존 수정 및 조회

```shell
SELECT CURRENT_SETTING('TIMEZONE'), NOW(), CURRENT_TIMESTAMP, clock_timestamp(); -- 조회
SET TIME ZONE 'Asia/Seoul'; -- 변경
```

## 한번에 많은 쿼리 업데이트하기

```sql
update commercial_construction set commercial_construction.credit_rate = result.rate
    from (select commercial_construction.id as id, e.credit_rate as rate from commercial_construction
inner join construction_contract cc on commercial_construction.id = cc.commercial_construction_id
inner join contract c on cc.id = c.construction_contract_id
inner join project p on c.id = p.contract_id
inner join epc e on p.epc_id = e.id) result
where id = result.id;
```

## 데이터 한번에 삽입하기

```sql
insert into [table] select [data]
```

## 데이터 한번에 업데이트하기

```sql
update [table] set [column = result.1] , from (select 1,2 from [table]) result where id = result.2
```

## 컬럼 삭제

```sql
ALTER TABLE epc
DROP COLUMN credit_rate;
```

## max 넘버로 시퀀스 바로 세팅

```sql
select setval('seq_name', (select max(id) from [table name]));
```

## 시퀀스 max값 만들기

```sql
select setval(id) from (select max(id) from  [table])
```

## postgresql enum 수정하기

```sql
ALTER TYPE category_enum RENAME TO temp_category_enum;

CREATE TYPE category_enum as enum ('BUSINESS_LICENSE', 'CONSTRUCTION_PERFORMANCE_DOCUMENT');

ALTER TABLE document ALTER COLUMN category TYPE category_enum USING category::text::category_enum;

DROP TYPE temp_category_enum;

SELECT enum_range(null::category_enum)


--- 데이터에 디폴트 값이 있어 오류가 날경우
ALTER TABLE contract
    ALTER COLUMN status DROP DEFAULT,
    ALTER COLUMN status TYPE category_enum USING status::text::category_enum,
    ALTER COLUMN status SET DEFAULT 'CREATED';
```

## 효율적인 쿼리

1. HAVING 대신 WHERE 를 사용하자
2. Primary Key 에는 DISTINCT 를 사용하지 않아도 된다.
3. Nest가 필요한경우 서브 쿼리보다는 JOIN 문을 사용하도록 하자.
4. OR 문을 사용하는거 보다 IN 을 사용하도록 하자.
5. DISTICNT를 사용한다면 서브쿼리를 이용해 구현하는 방법을 고민해보도록하자!

```sql
SELECT c.country_id, c.country_name FROM countries c WHERE EXISTS (SELECT 'X' FROM customers e WHERE e.country_id = c.country_id);
```

6. UNION 보다는 UNION ALL이 더 효율적이다.
7. JOIN 문에 OR를 사용하면 쿼리문이 최소 2배가 느려진다.
8. 함수를 사용하는것보다 집계기능을 사용하는것이 더 효율적이다.

```sql
Original: SELECT * FROM sales WHERE EXTRACT (YEAR FROM TO_DATE (time_id, 'DD-MON-RR')) = 2001 AND EXTRACT (MONTH FROM TO_DATE (time_id, 'DD-MON-RR')) = 12;

Improved: SELECT * FROM sales WHERE TRUNC (time_id) BETWEEN TRUNC(TO_DATE('12/01/2001', 'mm/dd/yyyy')) AND TRUNC (TO_DATE ('12/30/2001', 'mm/dd/yyyy'));
```

9. 쿼리문에서의 수학 연산은 절대로 피해야할 요소중 하나이다.
