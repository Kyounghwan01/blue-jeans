## todo

1. react-query
2. 자주묻는질문
3. 공지사항
4. token exipred at 30일 넣고 그거 지나면 무조건 로그아웃, 재로그인하면 현재일 + 30일 추가
5. 탈퇴하면 문의내역 날렸음, 게시글 생성되면 날리는 로직 추가
6. getDocs util함수화
7. 친구, 채팅

## Eureka

1. declare d.ts에 넣으면 글로벌 작동됨
2. next는 Portal document에 넣어야함
3. api로 받은 \n white-space: pre-wrap; 넣으면 내려감
4. vercel 로그 확인 (웹 페이지 에러 로그가 vercel 배포버전에 쌓임 )
5. storybook 정리 + 컴포넌트 정리

## doc

- https://github.com/hugotox/nextjs-starter

## vercel deploy

```
#!/bin/bash  echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"  if [[ \"$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then   # Proceed with the build     echo "✅ - Build can proceed"   exit 1;  else   # Don't build   echo "🛑 - Build cancelled"   exit 0; fi
```

- 스크롤 바닥으로 안될때
- 채팅 밑에 div만들고 거기에 ref 걸어

## video 플랫폼

- vimeo

## storybook

- https://www.chromatic.com/library?appId=6247ebe3764d7e003a7be83a
