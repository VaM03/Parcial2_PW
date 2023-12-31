import React, { useEffect, useState } from 'react';
import styles from '../css/card.module.css'
import Button from '../components/Button';
const Card = ({ question, handlerAns, numeroPregunta, cantidadPreguntas, onPreviousClick }) => {

    const [answer, setAnswer] = useState('');
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        setAnswer('');
        setShowButton(true);
    }, [question]);

    const shuffleAnswers = (answers) => {
        const shuffledAnswers = [...question.incorrect_answers, question.correct_answer];


        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
        }

        return shuffledAnswers;
    };

    const shuffledAnswers = shuffleAnswers(question.incorrect_answers);

    const handleAnswers = (e) => {
        setAnswer(e.target.value);
        handlerAns(e.target.value);
    }

    const handlerGuardarPregunta = () => {
        const preguntas = localStorage.getItem('preguntas');
        const preguntasParse = JSON.parse(preguntas);
        const pregunta = {
            pregunta: question,
            respuestas: shuffledAnswers,
            category: question.category,

        };
        if (preguntasParse) {
            localStorage.setItem('preguntas', JSON.stringify([...preguntasParse, pregunta]));
            setShowButton(false);
            alert('Pregunta guardada');

        } else {
            localStorage.setItem('preguntas', JSON.stringify([pregunta]));
            setShowButton(false);
            alert('Pregunta guardada');
        }
    }
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h2>Pregunta:</h2>
                <p>{question.question}</p>
                <p>Categoría: {question.category}</p>
                <h3># pregunta {numeroPregunta}/{cantidadPreguntas}</h3>
            </div>
            <div className={styles.cardAnswers}>
                <h3>Respuestas:</h3>
                <select id="answerSelect" onChange={(e) => handleAnswers(e)}>
                    {shuffledAnswers.map((answer, index) => (
                        <option key={index} value={answer}>
                            {answer}
                        </option>
                    ))}
                </select>
                {showButton ? (
                    <>
                        <Button text={"Guardar"} onClick={handlerGuardarPregunta} />
                        {onPreviousClick && numeroPregunta > 1 && (
                            <Button text={"← Anterior"} onClick={onPreviousClick} />
                        )}
                    </>
                ) : null}

            </div>
        </div>
    );
};

export default Card;