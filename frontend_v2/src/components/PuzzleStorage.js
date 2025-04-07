const PuzzleStorage = {
  // Get full puzzle object by name
  get: (name) => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    return puzzles[name];
  },

  // Save or update a puzzle by name
  setCamera: (name, view, camera) => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    puzzles[name].camera = camera;
    puzzles[name].view = view;
    localStorage.setItem("puzzles", JSON.stringify(puzzles));
  },

  setPosition: (name, data) => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    puzzles[name].position= data;
    localStorage.setItem("puzzles", JSON.stringify(puzzles));
  },
  // Remove a puzzle by name
  remove: (name) => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    delete puzzles[name];
    localStorage.setItem("puzzles", JSON.stringify(puzzles));
  },

  // Optional: get list of all puzzle names
  listNames: () => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    return Object.keys(puzzles);
  }
};

export default PuzzleStorage;
