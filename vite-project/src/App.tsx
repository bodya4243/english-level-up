import './components/layout/Header.tsx'
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/layout/Layout.tsx";
import SignUp from "./components/common/authentication/SignUp.tsx";
import SignIn from './components/common/authentication/SignIn.tsx';
import Quiz from "./layouts/Quiz.tsx";
import GrammarCardContent from "./pages/grammar/GrammarCardContent.tsx";
import Translating from "./pages/translating/Translating.tsx";
import ReadingContent from "./pages/reading/ReadingContent.tsx";
import ListeningContent from "./pages/listening/ListeningContent.tsx";
import WritingContent from "./pages/writing/WritingContent.tsx";
import Grammar from "./pages/grammar/Grammar.tsx";
import Listening from "./pages/listening/Listening.tsx";
import Reading from "./pages/reading/Reading.tsx";
import Writing from "./pages/writing/Writing.tsx";
import routes from "./constants/routesConfig.ts";

function App() {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/A-reading" element={<Reading key='A-reading' link={routes.reading.A1}/>}/>
                <Route path="/B-reading" element={<Reading key='B-reading' link={routes.reading.B1}/>}/>
                <Route path="/C-reading" element={<Reading key='C-reading' link={routes.reading.C1}/>}/>
                <Route path="/reading-content" element={<ReadingContent/>}/>
                <Route path="/A-grammar" element={<Grammar key='A-grammar' link={routes.grammar.A1}/>}/>
                <Route path="/B-grammar" element={<Grammar key='B-grammar' link={routes.grammar.B1}/>}/>
                <Route path="/C-grammar" element={<Grammar key='C-grammar' link={routes.grammar.C1}/>}/>
                <Route path="/grammar-content" element={<GrammarCardContent/>}/>
                <Route path="/A-listening" element={<Listening key='A-listening' link={routes.listening.A1}/>}/>
                <Route path="/B-listening" element={<Listening key='B-listening' link={routes.listening.B1}/>}/>
                <Route path="/C-listening" element={<Listening key='C-listening' link={routes.listening.C1}/>}/>
                <Route path="/listening-content" element={<ListeningContent/>}/>
                <Route path="/A-writing" element={<Writing key='A-writing' link={routes.writing.A1}/>}/>
                <Route path="/B-writing" element={<Writing key='B-writing' link={routes.writing.B1}/>}/>
                <Route path="/C-writing" element={<Writing key='C-writing' link={routes.writing.C1}/>}/>
                <Route path="/writing-content" element={<WritingContent/>}/>
                <Route path="/translating" element={<Translating/>}/>
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
