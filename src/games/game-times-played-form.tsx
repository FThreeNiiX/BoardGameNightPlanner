import * as React from 'react';
import {  saveGame } from 'firebase-hooks/games';
import { Document, Event, Game } from 'models';
import { saveEvent } from 'firebase-hooks/events';



interface GameTimesPlayedFormProps {
    game: Document<Game>
    event: Document<Event>
}

export const GameTimesPlayedForm: React.FC<GameTimesPlayedFormProps> = ({game,event}) => {
    async function handleSubmit(val:number) {
        const timesPlayed = game.data?.timesPlayed ?  game.data.timesPlayed + val : 1;
        await saveGame({...game.data, timesPlayed},game.id);
        await saveEvent(event.id,{...event.data, game:{id:game.id, data:{...game.data, timesPlayed}}});
    }
    
    return <>
        <h3 className="is-size-7">Times Played: {game.data.timesPlayed}</h3>
        <div className="columns">
        <div className="column">
        <button className="button is-primary" onClick={()=>handleSubmit(1)}>+1</button>
        </div>
        <div className="column">
        <button className="button is-primary" onClick={()=>handleSubmit(-1)}>-1</button>
        </div>
        </div>
    </>
}