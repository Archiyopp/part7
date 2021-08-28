import React from 'react';

export default function Anecdote({ anecdote }) {
  if (!anecdote) {
    return <p>No anecdote found</p>;
  }
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
}
