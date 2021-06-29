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
