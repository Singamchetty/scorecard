const scoreColor = (value) => {
    if (value < 1) {
      return 'bg-red-400';
    } else if (value >= 1 && value < 2) {
      return 'bg-red-300';
    } else if (value >= 2 && value < 3) {
      return 'bg-green-400';
    } else if (value >= 3 && value < 4) {
      return 'bg-green-500';
    } else if (value >= 4 && value < 5) {
      return 'bg-green-600';
    } else if (value >= 5) {
      return 'bg-green-600';
    } else {
      return '';
    }
};

export default scoreColor;