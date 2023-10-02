export function getColorBasedOnId(id: string) {
    const colors = [
      "bg-gradient-to-r from-red-200 via-red-300 to-red-400",
      "bg-gradient-to-r from-green-200 via-green-300 to-green-400",
      "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400",
      "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400",
      "bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400",
      "bg-gradient-to-r from-violet-200 via-violet-300 to-violet-400",
      "bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400",
      "bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400",
      "bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400",
    ];
    const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = sum % colors.length;
    return colors[colorIndex];
  }
