import './App.css';
import Router from './Router';
import { Container } from '@mui/material'
import React, { useState } from 'react'
import Header from './components/Header';

// 他コンポーネントからuseContextで毎回呼び出す雛形
export const LatLong = React.createContext()

function App() {
  // useContextに値をセットする方法
  // 元ネタはhttps://stackoverflow.com/questions/54738681/how-to-change-the-value-of-a-context-with-usecontext
  //   https://dev.to/efearas/how-to-usecontext-and-set-value-of-context-in-child-components-in-3-steps-3j9h
  // 
  const [currentPos, SetCurrentPos] = useState([35.680, 139.767])
  const [currentZoom, SetCurrentZoom] = useState(13)
  const [loginuser, SetLoginuser] = useState({
    uid: "",
    isLoggedIn: false,
    isLoading: true
  })

  return (
    <div className="App">
        <Header/>
        <Container maxWidth="xs" style={{backgroundColor: '#cfe8fc', height: '100vh', paddingTop: '5vh'}}>
        {/* LatLong.ProviderのValueに2つの引数を渡す */}
        {/* 一つ目はマップセンターの経度緯度 */}
        {/* 二つ目はuseStateを使用して値を代入できるメソッド */}
        <LatLong.Provider value={{currentPos, SetCurrentPos, currentZoom, SetCurrentZoom, loginuser, SetLoginuser}}>
            <Router />
        </LatLong.Provider>
        </Container>
    </div>
  );
}

export default App;
