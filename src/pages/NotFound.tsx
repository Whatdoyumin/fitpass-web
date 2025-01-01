function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <p className="text-50px font-bold text-gray">404</p>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-16px font-bold text-gray-808080">찾을 수 없는 페이지입니다.</p>
        <p className="text-12px text-gray">
          요청하신 페이지가 사라졌거나 잘못된 경로를 이용하셨습니다.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
