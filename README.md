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

## doc

- https://github.com/hugotox/nextjs-starter

```
/**
 * SEO default setting
 */
// const DEFAULT_SEO = {
// 	title: '시니어 블루진',
// 	description: '필요할때 필요한만큼, 필요할때 언제어디서든, 온라인쇼핑 처럼 보험을 편리하게',
// 	canonical: 'https://www.carrotins.com',
// 	openGraph: {
// 		type: 'website',
// 		locale: 'ko_KR',
// 		url: 'https://www.carrotins.com',
// 		title: '보험의 새로운 기준 캐롯손해보험',
// 		site_name: '캐롯손해보험',
// 		images: [{ url: 'https://cdn.carrotins.com/static/images/common/nav_sub01_img.png', width: 285, height: 167, alt: '캐롯손해보험' }],
// 	},
// 	// twitter: {
// 	//     handle: '@handle',
// 	//     site: '@site',
// 	//     cardType: 'summary_large_image',
// 	// },
// };
```

## vercel deploy

```
#!/bin/bash  echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"  if [[ \"$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then   # Proceed with the build     echo "✅ - Build can proceed"   exit 1;  else   # Don't build   echo "🛑 - Build cancelled"   exit 0; fi
```
