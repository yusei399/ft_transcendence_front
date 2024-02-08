import {Flex} from '@chakra-ui/react';
import Me from './users/components/Me';
import MatchHistory from './game/components/MatchHistory';

export default function IndexPage() {
  return (
    <Flex
      direction={{base: 'column', md: 'row'}} // モバイルでは縦並び、タブレット/デスクトップでは横並び
      overflowY={{base: 'auto', md: 'unset'}} // モバイルでは自動スクロール、タブレット/デスクトップではスクロールなし
      justify="space-around"
      width="100%"
      height="100%" // 画面全体を使用
      gap="24px" // コンポーネント間の間隔
    >
      <Flex justifyContent="center" alignSelf="center" width={{base: "100%", md: "auto"}}>
        <Me />
      </Flex>
      <Flex
        overflowY={{base: 'inherit', md: 'auto'}} // モバイルでは親から継承、タブレット/デスクトップではスクロール可能
        justifyContent="center"
        alignSelf="center"
        flex="1" // MatchHistoryコンポーネントが利用可能なスペースを埋めるように
        maxWidth="100%" // 最大幅を100%に設定して、オーバーフロー時にスクロール可能に
      >
        <MatchHistory />
      </Flex>
    </Flex>
  );
}
