// 예시)
// function usePostLogin() {
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: (data: TAuthBody) => postLogin(data),
//     mutationKey: ['login'],
//     onSuccess: () => navigate('/'),
//     onError: (error) => console.log('로그인 실패', error.message),
//   });
// }
