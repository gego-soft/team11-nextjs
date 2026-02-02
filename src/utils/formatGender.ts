 export const formatGender = (gender: string | null) => {
    if (!gender) return "Not set";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };
