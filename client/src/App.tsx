import toast, { Toaster } from 'react-hot-toast';
import GeneralContext from './contexts/general_context';
import MainPage from './Pages/Main';
import styled from 'styled-components';

//full screen
const MainContainer = styled.div`
  min-height: calc(100vh - 40px);
  padding:40px 15px 0px 40px;
  background-color: #1b1b1b;

  
  &::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
    background: #272727; 
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: #383838; 
    border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`

function App() {

  return (
    <GeneralContext>
      <MainContainer>

        <Toaster
          position="top-left"
          reverseOrder={false}
        />
        <MainPage />
      </MainContainer>

    </GeneralContext>
  );
}

export default App;
