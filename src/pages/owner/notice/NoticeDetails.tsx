import { useParams } from "react-router-dom";
import { IcViewers } from "../../../assets/svg";

export const mockNotices = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `${i + 1}번 테스트 공지사항입니다.`,
  content: `<p>이것은 ${i + 1}번째 공지의 상세 내용입니다. <strong>중요 공지</strong>입니다.</p>`,
  imageUrl: "https://via.placeholder.com/340x255", // 예시 이미지
  createdAt: new Date(2024, 10, i + 1).toISOString(),
  views: Math.floor(Math.random() * 500 + 1),
  noticeType: i % 2 === 0 ? "공지사항" : "이벤트",
}));


const OwnerNoticeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const notice = mockNotices.find((n) => n.id === Number(id));

  if (!notice) {
    return <div className="p-[25px]">공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-[25px] h-full">
      <h1 className="text-[22px] font-bold mb-[9px]">{notice.title}</h1>
      <div className="flex items-center text-sm text-gray-600 mb-[17px]">
        <span className="mr-[18px]">관리자</span>
        <span className="mr-[18px]">
          {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
        </span>
        <div className="flex items-center">
          <IcViewers width={"11px"} height={"11px"} />
          <span className="ml-[6px]">{notice.views}</span>
        </div>
      </div>

      <img
        src={notice.imageUrl}
        alt="공지 이미지"
        className="mb-[10px] w-[340px] h-[255px] object-cover"
      />
      <div
        className="text-gray-700 pb-[108px] leading-[1.6]"
        dangerouslySetInnerHTML={{ __html: notice.content }}
      ></div>
    </div>
  );
};

export default OwnerNoticeDetails;
