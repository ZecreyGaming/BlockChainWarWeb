import { NoteWrap } from "./styles";

const Note = () => {
  return (
    <NoteWrap>
      <div className="label">Game Note:</div>
      <div className="text">
        Enter the blockchain you support on the right, and the system will
        automatically count your votes. The blockchain that wins the most votes
        within the specified time will win the game!
      </div>
    </NoteWrap>
  );
};

export default Note;
