import { useParams } from 'react-router-dom';
import { Notice } from './Notice';
import ImgNotice from '../../assets/img/img_notice.jpg';
import IcViewers from '../../assets/svg/IcViewers';

const NoticeDetail = () => {
  const { id } = useParams<{ id: string }>();

  const notices: Notice[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? '공지' : '이벤트',
    title: `공지/이벤트 ${i + 1} 제목`,
    author: `작성자${i + 1}`,
    createdAt: new Date(2025, 0, i + 1).toISOString(),
    views: Math.floor(Math.random() * 1000),
    text: `이것은 공지/이벤트 ${i + 1}의 상세 내용입니다. 임대조건은 인근 시세의 40∼50% 수준이며 최장 10년까지 거주할 수 있다. 입주 후 혼인한 경우 20년까지 거주 가능하다.

학업·취업 등의 사유로 이주가 잦은 청년층의 수요를 반영해 주택 여건에 따라 냉장고, 세탁기, 에어컨 등 가전제품을 갖춰 공급될 예정이다.

서울 서초구 서초동에 위치한 청년매입임대주택은 이번에 37호를 공급하며 3호선 남부터미널역 400m 거리에 위치해 있으며 서울교대 인근 도심에 자리잡고 있다.

신혼·신생아 매입임대주택은 결혼 7년 이내 (예비)신혼부부, 2년 이내 출생아가 있는 신생아가구 등을 대상으로 공급하는 주택이다. 지역별로는 서울·경기·인천 등 수도권 지역이 702호, 그 외 지역은 837호이며 소득·자산기준 등에 따라 신혼·신생아Ⅰ,Ⅱ 유형으로 구분된다.
`,

    imageUrl: ImgNotice,
  }));

  const notice = notices.find((n) => n.id === Number(id));

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-[25px] min-h-screen">
      <h1 className="text-[22px] font-bold mb-[9px]">
        [{notice.type}] {notice.title}
      </h1>
      <div className="flex items-center text-sm text-gray-600 mb-[17px]">
        <span className="mr-[18px]">{notice.author}</span>
        <span className="mr-[18px]">{new Date(notice.createdAt).toLocaleDateString()}</span>
        <div className="flex items-center">
          <IcViewers width={'11px'} height={'11px'} />
          <span className="ml-[6px]">{notice.views}</span>
        </div>
      </div>

      <img
        src={notice.imageUrl}
        alt="공지 이미지"
        className="mb-[10px] w-[340px] h-[255px] object-cover"
      />
      <p className="text-gray-700">{notice.text}</p>
    </div>
  );
};

export default NoticeDetail;
