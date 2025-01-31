import { useParams } from 'react-router-dom';
import { useGetNoticeById } from '../../apis/mypage/quries/useNoticeApi';
import IcViewers from '../../assets/svg/IcViewers';

const NoticeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: notice, isLoading, isError, error } = useGetNoticeById(Number(id));

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>{(error as Error).message || '공지사항을 불러오는 데 실패했습니다.'}</div>;
  }

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }


  return (
    <div className="p-[25px] min-h-screen">
      <h1 className="text-[22px] font-bold mb-[9px]">
        {notice.title}
      </h1>
      <div className="flex items-center text-sm text-gray-600 mb-[17px]">
        <span className="mr-[18px]">작성자 {notice.id}</span>
        <span className="mr-[18px]">{new Date(notice.createdAt).toLocaleDateString()}</span>
        <div className="flex items-center">
          <IcViewers width={'11px'} height={'11px'} />
          <span className="ml-[6px]">141</span>
        </div>
      </div>

      <img
        src={notice.imageUrl}
        alt="공지 이미지"
        className="mb-[10px] w-[340px] h-[255px] object-cover"
      />
      <p className="text-gray-700">{notice.content}</p>
    </div>
  );
};

export default NoticeDetail;
