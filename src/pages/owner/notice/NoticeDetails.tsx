import { useParams } from "react-router-dom";
import { IcViewers } from "../../../assets/svg";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useGetOwnerNoticeById } from "../../../hooks/useNoticeApi";

const OwnerNoticeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: notice, isLoading, isError, error } = useGetOwnerNoticeById(Number(id));
    
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>{(error as Error).message || "공지사항을 불러오는 데 실패했습니다."}</div>;
  }

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
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
