export const APPLICANT_NAME = '이창호';

export const SCENE_STRINGS = {
  home: {
    header: {
      content: APPLICANT_NAME,
    },
    main: {
      content: `안녕하세요\n${APPLICANT_NAME}입니다.`,
    },
    footer: {
      buttonText: '다음',
    },
  },
  result: {
    header: {
      content: APPLICANT_NAME,
    },
    label: {
      title: {
        id: 'id',
        author: 'author',
        width: 'width',
        height: 'height',
        url: 'url',
        download_url: 'download_url',
      },
    },
    alert: {
      noRecord: {
        title: '안내',
        content: '조회 이력이 없어, 1초 뒤 메인 페이지로 이동합니다.',
      },
      noResponse: {
        title: '에러',
        content: '조회 결과를 불러오는데 실패했습니다.\n 메인 페이지로 이동합니다.',
        buttonText1: '이동',
      },
    },
    buttonText: '이전',
  },
};
