export interface DraftNotice {
  id: number;
  title: string;
  image: File | string;
  category: string;
  content: string;
  status: string;
}

export const mockDraftNotices: DraftNotice[] = [
  {
    id: 1,
    title: "임시저장 값 따로 api 내려오려나 id 1",
    category: "이벤트",
    image: "https://fitpass-s3.s3.ap-northeast-2.amazonaws.com/notice/f1e7d166-c9be-4381-9495-39afc9ec617e/KakaoTalk_20210412_114632120_02.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250218T113235Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIASVLKCJ4RQDTWFZWS%2F20250218%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=44dc223acba2784e8209c231675949e58db71d3baacfd22ec842115d02036cf8",
    content: "개긴 string값",
    status: "임시저장",
  },
  {
    id: 2,
    title: "공지사항 임시저장 id 2",
    category: "공지사항",
    image: "none",
    content: "개긴 string값개긴 string값",
    status: "임시저장",
  },
  {
    id: 3,
    title: "공지사항 임시저장 id 3",
    category: "공지사항",
    image: "none",
    content: "진짜 긴 string값",
    status: "임시저장",
  },
  {
    id: 4,
    title: "공지사항 임시저장 id 4",
    category: "공지사항",
    image: "none",
    content: "진짜 긴 string값",
    status: "임시저장",
  },
  {
    id: 5,
    title: "임시저장 이벤트 공지 5",
    category: "이벤트",
    image: "none",
    content: "이벤트 관련 내용입니다.",
    status: "임시저장",
  },
  {
    id: 6,
    title: "공지사항 임시저장 6",
    category: "공지사항",
    image: "https://fitpass-s3.s3.ap-northeast-2.amazonaws.com/notice/f1e7d166-c9be-4381-9495-39afc9ec617e/KakaoTalk_20210412_114632120_02.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250218T113235Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIASVLKCJ4RQDTWFZWS%2F20250218%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=44dc223acba2784e8209c231675949e58db71d3baacfd22ec842115d02036cf8",
    content: "공지사항 내용이 긴 경우도 있습니다.",
    status: "임시저장",
  },
  {
    id: 7,
    title: "긴 제목을 가진 임시저장 공지 7",
    category: "공지사항",
    image: "none",
    content: "이건 내용이 아주 긴 공지사항입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다.이건 내용이 아주 긴 공지사항입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다.이건 내용이 아주 긴 공지사항입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다.이건 내용이 아주 긴 공지사항입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다. 내용이 길어도 상관없습니다. 내용은 계속해서 작성될 것입니다.",
    status: "임시저장",
  },
  {
    id: 8,
    title: "이벤트 공지사항 임시저장 8",
    category: "이벤트",
    image: "none",
    content: "이 이벤트는 올해 여름에 진행되는 행사입니다. 참가 신청을 서둘러주세요.",
    status: "임시저장",
  },
  {
    id: 9,
    title: "임시저장된 공지 9",
    category: "공지사항",
    image: "none",
    content: "이미지 없이도 공지사항을 작성할 수 있습니다. 내용은 적당히 길어서 문제되지 않습니다.",
    status: "임시저장",
  },
  {
    id: 10,
    title: "임시저장 이벤트 알림 10",
    category: "이벤트",
    image: "https://fitpass-s3.s3.ap-northeast-2.amazonaws.com/notice/f1e7d166-c9be-4381-9495-39afc9ec617e/KakaoTalk_20210412_114632120_02.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250218T113235Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIASVLKCJ4RQDTWFZWS%2F20250218%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=44dc223acba2784e8209c231675949e58db71d3baacfd22ec842115d02036cf8",
    content: "이번 이벤트는 다양한 상품이 준비되어 있습니다. 많은 참여 바랍니다!",
    status: "임시저장",
  },
];
