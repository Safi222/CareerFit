import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Search from './components/SearchD/Search'
import Jobs from './components/JobsD/Jobs'
import Value from './components/ValueD/Value'
import Footer from './components/FooterD/Footer'
import Slogan from './components/SloganD/Slogan';
const App = () => {
  return (
    <div className='w-[85%] m-auto bg-white'>
      <Navbar/>
      <Slogan />
      <Search/>
      <Jobs/>
      <Value/>
      <Footer/>
    </div>
  )
}

export default App