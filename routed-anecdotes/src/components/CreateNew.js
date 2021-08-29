import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.values.value,
      author: author.values.value,
      info: info.values.value,
      votes: 0,
    });
    history.push('/');
  };

  const resetForm = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content.values} />
        </div>
        <div>
          author
          <input name="author" {...author.values} />
        </div>
        <div>
          url for more info
          <input name="info" {...info.values} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetForm}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
