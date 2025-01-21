import './components/layout/Header.tsx'
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import TranslatingPage from "./pages/translating/TranslatingPage.tsx";
import VocabPage from "./pages/VocabPage.tsx";
import Layout from "./components/layout/Layout.tsx";
import SignUp from "./components/common/authentication/SignUp.tsx";
import SignIn from './components/common/authentication/SignIn.tsx';
import Quiz from "./layouts/Quiz.tsx";
import AGrammar from "./pages/grammar/AGrammar.tsx";
import BGrammar from "./pages/grammar/BGrammar.tsx";
import CGrammar from "./pages/grammar/CGrammar.tsx";
import GrammarCardContent from "./pages/grammar/GrammarCardContent.tsx";
import EngToUkr from "./pages/translating/EngToUkr.tsx";
import Translating from "./pages/translating/Translating.tsx";
import AReading from "./pages/reading/AReading.tsx";
import BReading from "./pages/reading/BReading.tsx";
import CReading from "./pages/reading/CReading.tsx";
import ReadingContent from "./pages/reading/ReadingContent.tsx";
import AListening from "./pages/listening/AListening.tsx";
import BListening from "./pages/listening/BListening.tsx";
import CListening from "./pages/listening/CListening.tsx";
import ListeningContent from "./pages/listening/ListeningContent.tsx";
import AWriting from "./pages/writing/AWriting.tsx";
import BWriting from "./pages/writing/BWriting.tsx";
import CWriting from "./pages/writing/CWriting.tsx";
import WritingContent from "./pages/writing/WritingContent.tsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/A-reading" element={<AReading/>}/>
                <Route path="/B-reading" element={<BReading/>}/>
                <Route path="/C-reading" element={<CReading/>}/>
                <Route path="/reading-content" element={<ReadingContent/>}/>
                <Route path="/A-grammar" element={<AGrammar/>}/>
                <Route path="/B-grammar" element={<BGrammar/>}/>
                <Route path="/C-grammar" element={<CGrammar/>}/>
                <Route path="/grammar-content" element={<GrammarCardContent/>}/>
                <Route path="/A-Listening" element={<AListening/>}/>
                <Route path="/B-Listening" element={<BListening/>}/>
                <Route path="/C-Listening" element={<CListening/>}/>
                <Route path="/Listening-content" element={<ListeningContent/>}/>
                <Route path="/A-Writing" element={<AWriting/>}/>
                <Route path="/B-Writing" element={<BWriting/>}/>
                <Route path="/C-Writing" element={<CWriting/>}/>
                <Route path="/writing-content" element={<WritingContent/>}/>
                <Route path="/translating" element={<Translating/>}/>
                <Route path="/vocabulary" element={<VocabPage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/quiz" element={<Quiz/>}/>
                <Route path="/start-test" element={<Quiz/>}/>
                <Route path="/grammar-test" element={<Quiz/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
