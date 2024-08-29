export default function GetEditButton({ indexor, setIsVisible }: sendtoEditButton) {
    const index = indexor + 1;
    const toggleVisibility = () => {
      const newVisibilityStates = [...isVisible];
      newVisibilityStates[index] = !newVisibilityStates[index];
      setIsVisible(newVisibilityStates);
    };
    return (
      <div>
        <button className="edit-button" onClick={toggleVisibility}>🖉</button>
      </div>
    )
  }