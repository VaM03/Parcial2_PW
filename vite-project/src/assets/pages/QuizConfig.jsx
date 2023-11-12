import React, { useEffect, useState } from 'react';
import styles from '../css/QuizConfig.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getQuestions } from '../services/api';
import Quizz from '../pages/Quizz';

const QuizConfig = () => {
  const navigate = useNavigate();
  const categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 10, name: 'Books' },
    { id: 11, name: 'Film' },
    { id: 12, name: 'Music' },
    { id: 17, name: 'Science & Nature' },
    { id: 18, name: 'Science: Computers' },
    { id: 19, name: 'Science: Mathematics' },
    { id: 20, name: 'Mythology' },
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 24, name: 'Politics' },
    { id: 25, name: 'Art' },
    { id: 26, name: 'Celebrities' },
    { id: 27, name: 'Animals' },
    { id: 28, name: 'Vehicles' },
    { id: 29, name: 'Comics' },
    { id: 30, name: 'Gadgets' },
    { id: 31, name: 'Japanese Anime & Manga' },
    { id: 32, name: 'Cartoon & Animations' },
  ];
  const promises = [];
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('multiple');
  const [setConfig, setSetConfig] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleStartQuiz = async () => {
    const promises = categories.map((category) =>
      axios.get(`https://opentdb.com/api.php?amount=1&category=${category.id}`)
    );

    try {
      const responses = await Promise.all(promises);
      const questionData = responses.map((response) => response.data.results[0]);

      setQuestions(questionData);
      setSetConfig(true);
    } catch (error) {
      console.error('Error al obtener preguntas:', error);
    }
  };

  const goBack = () => {
    navigate('/');
  }
  const handlerShowQuizzSaved = () => {
    navigate('/quizzSaved');
  }


  return (
    <div>
      {setConfig ? (
        <Quizz questions={questions} />
      ) : (<>
        <h1>Configuración del Quiz</h1>
        <form>

          <label>
            Dificultad:
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="">Seleccionar Dificultad</option>
              <option value="easy">Fácil</option>
              <option value="medium">Intermedia</option>
              <option value="hard">Difícil</option>
            </select>
          </label>

          <button type="button" onClick={handleStartQuiz}>
            Comenzar el Quiz
          </button>
          <button style={{ marginTop: "15px", backgroundColor: "#94122c" }} type="button" onClick={goBack}>
            Regresar
          </button>

        </form>
      </>)}
    </div>
  );
};

export default QuizConfig;