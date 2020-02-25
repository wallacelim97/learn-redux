import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { addTask } from "../redux/actions";
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

const AddTask = (props) => {

    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);

    const handleKeyPress = e => {
        if (e.which === 13 || e.keyCode === 13) {
            handleAddTask();
        }
    }

    const handleAddTask = () => {
        if (!input) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 1800);
            return;
        }

        let date = new Date();
        props.addTask({
            dateTimeAdded: `${date.getDate().toString().padStart(2, '0')} / ${date.getMonth().toString().padStart(2, '0')} / ${date.getFullYear().toString().padStart(4, '0')} ${date.getHours().toString().padStart(2, '0')} : ${date.getMinutes().toString().padStart(2, '0')}`.replace(/^ {4}/gm, ''),
            name: input,
            completed: false
        });
        setInput("");
    };

    const target = useRef(null);

    return (
        <>
            <Input onChange={e => setInput(e.target.value)}
                value={input} onKeyPress={handleKeyPress} />
            <Button ref={target} onClick={handleAddTask}>Add</Button>
            <Overlay target={target.current} show={show} placement="right">
                {props => (
                    <StyledTooltip arrowProps={target} id="overlay-example" {...props}>
                        Please input a task name
                </StyledTooltip>
                )}
            </Overlay>
        </>
    );
}


export default connect(null, { addTask })(AddTask);

const StyledTooltip = styled(Tooltip)`
    background: #50FA7B;
    padding: 0.25em 0.5em;
    margin-left: 5px;
    border-radius: 3px;
`

const Input = styled.input`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em;
    border: 2px solid #BD93F9;
    border-radius: 3px;
`

const Button = styled.button`
    background: ${props => props.active ? "#BD93F9" : "inherit"};
    color: ${props => props.complete ? "inherit" : "#BD93F9"};
    &:hover {
        background: #BD93F9;
        color: #282A36;
    }
    &:focus {
        outline: none;
    }
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #BD93F9;
    border-radius: 3px;
`