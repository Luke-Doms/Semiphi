const PuzzleStorage = {
  // Get full puzzle object by name
  get: (name) => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    return puzzles[name];
  },

  // Save or update a puzzle by name
  setCamera: (name, view, camera) => {
    console.log(name, camera, view);
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    puzzles[name].camera = camera;
    puzzles[name].view = view;
    localStorage.setItem("puzzles", JSON.stringify(puzzles));
  },

  setPosition: (name, data) => {
    console.log(name, data);
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    puzzles[name].position= data;
    localStorage.setItem("puzzles", JSON.stringify(puzzles));
  },
  // Remove a puzzle by name
  reset: (name) => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    delete puzzles[name].view;
    delete puzzles[name].camera
    delete puzzles[name].position;
    localStorage.setItem("puzzles", JSON.stringify(puzzles));
  },

  // Optional: get list of all puzzle names
  listPuzzles: () => {
    const puzzles = JSON.parse(localStorage.getItem("puzzles") || "{}");
    console.log(puzzles);
  }
};

export default PuzzleStorage;
